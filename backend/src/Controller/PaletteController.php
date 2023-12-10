<?php

namespace App\Controller;

use App\Entity\Palette;
use App\Entity\PaletteColor;
use App\Entity\User;
use App\Entity\Color;

use App\Repository\PaletteRepository;
use App\Repository\UserRepository;
use App\Repository\ColorRepository;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class PaletteController extends AbstractController
{
    private $entityManager;
    private UserRepository $userRepository;
    private PaletteRepository $paletteRepository;
    private ColorRepository $colorRepository;

    public function __construct(EntityManagerInterface $entityManager, UserRepository $userRepository, PaletteRepository $paletteRepository, ColorRepository $colorRepository)
    {
        $this->entityManager = $entityManager;
        $this->userRepository = $userRepository;
        $this->paletteRepository = $paletteRepository;
        $this->colorRepository = $colorRepository;
    }

    public function insertPalette(Request $request): Response
    {
        // Expected: /api/insertPalette
        // Bearer token: required
        // JSON: { "nombre_propietario": "nombre", "descargado": true, "colors": [1, 2, 3]}
        // Method: POST
        $data = json_decode($request->getContent(), true);

        // 0. Verificar que el JSON tenga los datos requeridos
        if (!isset($data['nombre_propietario']) || !isset($data['descargado']) || !isset($data['colors']) || !isset($data['nombre_palette'])) {
            return new JsonResponse(['error' => 'Faltan datos requeridos.'], Response::HTTP_BAD_REQUEST);
        }

        $nombrePropietario = $data['nombre_propietario'];
        $nombrePalette = $data['nombre_palette'];
        $descargado = $data['descargado'];
        $coloresIDS = $data['colors'];

        // 0. Verificar que los colores existen
        foreach ($coloresIDS as $colorID) {
            $colorRepository = $this->entityManager->getRepository(Color::class);
            $color = $colorRepository->findOneBy(['id' => $colorID]);
            if (!$color) {
                return new JsonResponse(['error' => 'Color no encontrado.'], Response::HTTP_NOT_FOUND);
            }
        }

        // 1. Verificar que el usuario exista
        $userRepository = $this->entityManager->getRepository(User::class);
        $propietario = $userRepository->findOneBy(['username' => $nombrePropietario]);

        if (!$propietario) {
            return new JsonResponse(['error' => 'Usuario no encontrado.'], Response::HTTP_NOT_FOUND);
        }

        // 2. Verificar si $propietario realmente tiene el método getUsername
        if (!method_exists($propietario, 'getUsername')) {
            return new JsonResponse(['error' => 'El objeto de usuario no tiene el método getUsername.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        // 3. Crear la paleta
        $palette = new Palette();
        $palette->setNombrePropietario($propietario->getUsername());
        $palette->setDescargado($descargado);
        $palette->setNombrePalette($nombrePalette);
        $paletteID = $palette->getId();
        //$palette->setPropietario($propietario);

        // 4. Bloque para depurar
        try {
            $this->entityManager->persist($palette);
            $this->entityManager->flush();
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }


        // Como ya se creó la paleta, se puede crear la relación entre la paleta y el usuario
        // 5. Crear la relación entre la paleta y el usuario

        foreach ($coloresIDS as $colorID) {
            // 5.1. Verificar que el color exista
            $colorRepository = $this->entityManager->getRepository(Color::class);
            $color = $colorRepository->findOneBy(['id' => $colorID]);

            // 5.2. Crear la relación guardando los IDs (En symfony no se puede guardar el valor directamente)
            $paletteColor = new PaletteColor();
            $paletteColor->setPalette($palette);
            $paletteColor->setColor($color);

            // 5.3. Guardar la relación
            $this->entityManager->persist($paletteColor);
            $this->entityManager->flush();
        }

        return new JsonResponse(['message' => 'Paleta creada con éxito.'], Response::HTTP_CREATED);
    }

    public function getPalettes(): Response
    {
        $palettes = $this->paletteRepository->findAll();

        $palettesArray = [];
        foreach ($palettes as $palette) {
            $palettesArray[] = [
                'id' => $palette->getId(),
                'nombre_propietario' => $palette->getNombrePropietario(),
                'descargado' => $palette->isDescargado(),
            ];
        }

        return new JsonResponse($palettesArray, Response::HTTP_OK);
    }

    public function getPalettesLR(): Response
    {
        //Buscar primero a los usuarios de Los ríos
        $usersInLosRios = $this->userRepository->findBy(['region' => 'Los Ríos']);

        $palettesArray = [];

        foreach ($usersInLosRios as $user) {
            //Paletas del usuario
            $palettes = $this->paletteRepository->findBy(['nombre_propietario' => $user->getUsername()]);

            foreach ($palettes as $palette) {
                $palettesArray[] = [
                    'id' => $palette->getId(),
                    'nombre_propietario' => $palette->getNombrePropietario(),
                    'descargado' => $palette->isDescargado(),
                ];
            }
        }

        return new JsonResponse($palettesArray, Response::HTTP_OK);
    }

    /*
    public function getTopPalettes(): JsonResponse
    {
        // Busca el repositorio
        $paletteRepository = $this->entityManager->getRepository(Palette::class);

        // Hace la consulta: Entrega los colores de las paletas con mas ???.
        $result = $paletteRepository->findTopPalettes();

        $palettesArray = [];
        foreach ($result as $row) {
            $paletteId = $row['paletteId']; // Estos nombres son definidos en la consulta del repository.
            $color = [
                'id' => $row['colorId'],    // Estos nombres son definidos en la consulta del repository.
                'category' => $row['category'],
                'commune' => $row['commune'],
                'season' => $row['season'],
                'colorName' => $row['colorName'],
                'image' => $row['image'],
                'ncsNuance' => $row['ncsNuance'],   // Si algo no funciona es porque le quite la primera mayuscula a NCS, Munsell y Ceresita.
                'ncsHue' => $row['ncsHue'],
                'munsellPage' => $row['munsellPage'],
                'munsellHue' => $row['munsellHue'],
                'munsellValue' => $row['munsellValue'],
                'munsellChroma' => $row['munsellChroma'],
                'munsellName' => $row['munsellName'],
                'L*' => $row['cielabL'],
                'A*' => $row['cielabA'],
                'B*' => $row['cielabB'],
                'R' => $row['rgbR'],
                'G' => $row['rgbG'],
                'B' => $row['rgbB'],
                'C' => $row['cmykC'],
                'M' => $row['cmykM'],
                'Y' => $row['cmykY'],
                'K' => $row['cmykK'],
                'ceresita' => $row['ceresitaName'],
            ];
            $palettesArray[$paletteId][] = $color;  // Guarda este color dentro de su paleta correspondiente.
        }
        $palettesArray = array_values($palettesArray);  // Se supone que esto elimina espacios vacios dentro de la lista.
        return new JsonResponse(['palettes' => $palettesArray], Response::HTTP_OK);
    }
    */
    public function getPalettesByUsername(string $username): JsonResponse
    {
        // Expected: /api/getPalettesByUsername/{username}
        // Bearer token: required
        // Method: GET

        // Busca el repositorio
        $paletteRepository = $this->entityManager->getRepository(Palette::class);

        // Hace la consulta: Entrega hasta 10 paletas con mas ???.
        $result = $paletteRepository->findPalettesByUsername($username);

        $palettesArray = [];
        foreach ($result as $row) {
            $paletteId = $row['paletteId']; // Estos nombres son definidos en la consulta del repository.
            $paletteName = $row['nombre_palette'];
            $color = [
                'id' => $row['colorId'],    // Estos nombres son definidos en la consulta del repository.
                'category' => $row['category'],
                'commune' => $row['commune'],
                'season' => $row['season'],
                'colorName' => $row['colorName'],
                'image' => $row['image'],
                'ncsNuance' => $row['ncsNuance'],   // Si algo no funciona es porque le quite la primera mayuscula a NCS, Munsell y Ceresita.
                'ncsHue' => $row['ncsHue'],
                'munsellPage' => $row['munsellPage'],
                'munsellHue' => $row['munsellHue'],
                'munsellValue' => $row['munsellValue'],
                'munsellChroma' => $row['munsellChroma'],
                'munsellName' => $row['munsellName'],
                'L*' => $row['cielabL'],
                'A*' => $row['cielabA'],
                'B*' => $row['cielabB'],
                'R' => $row['rgbR'],
                'G' => $row['rgbG'],
                'B' => $row['rgbB'],
                'C' => $row['cmykC'],
                'M' => $row['cmykM'],
                'Y' => $row['cmykY'],
                'K' => $row['cmykK'],
                'ceresita' => $row['ceresitaName'],
                'categoryName' => $row['categoryName'],
                'rowId' => $row['rowID']
            ];

            // Verificar si la paleta ya existe en el array de paletas
            $existingPalette = array_filter($palettesArray, function ($palette) use ($paletteId) {
                return $palette['id'] == $paletteId;
            });

            // Si la paleta no existe, agregarla al array de paletas
            if (empty($existingPalette)) {
                $palettesArray[] = [
                    'id' => $paletteId,
                    'nombre_palette' => $paletteName,
                    'username' => $username,
                    'colors' => [$color] // Asegurar que el array de colores sea una lista de colores. [{color}, {color}, {color}}]
                ];
            } else {    // Si la paleta existe, añade el color a su array de colores.
                $existingPaletteKey = key($existingPalette);
                $palettesArray[$existingPaletteKey]['colors'][] = $color;
            }
        }
        return new JsonResponse(['palettes' => $palettesArray], Response::HTTP_OK);
    }
}
