<?php

namespace App\Controller;

use App\Entity\Palette;
use App\Entity\User;
use App\Repository\PaletteRepository;
use App\Repository\UserRepository;
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

    public function __construct(EntityManagerInterface $entityManager, UserRepository $userRepository, PaletteRepository $paletteRepository)
    {
        $this->entityManager = $entityManager;
        $this->userRepository = $userRepository;
        $this->paletteRepository = $paletteRepository;
    }

    public function insertPalette(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['nombre_propietario']) || !isset($data['descargado'])) {
            return new JsonResponse(['error' => 'Faltan datos requeridos.'], Response::HTTP_BAD_REQUEST);
        }

        $nombrePropietario = $data['nombre_propietario'];
        $descargado = $data['descargado'];

        $userRepository = $this->entityManager->getRepository(User::class);

        $propietario = $userRepository->findOneBy(['username' => $nombrePropietario]);

        if (!$propietario) {
            return new JsonResponse(['error' => 'Usuario no encontrado.'], Response::HTTP_NOT_FOUND);
        }

        //Verificar si $propietario realmente tiene el método getUsername
        if (!method_exists($propietario, 'getUsername')) {
            return new JsonResponse(['error' => 'El objeto de usuario no tiene el método getUsername.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        $palette = new Palette();
        $palette->setNombrePropietario($propietario->getUsername());
        $palette->setDescargado($descargado);
        //$palette->setPropietario($propietario);

        //Bloque para depurar
        try {
            $this->entityManager->persist($palette);
            $this->entityManager->flush();
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
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
    public function getPalettesByUserId(string $userId): JsonResponse
    {
        // Busca el repositorio
        $paletteRepository = $this->entityManager->getRepository(Palette::class);

        // Hace la consulta: Entrega hasta 10 paletas con mas ???.
        $result = $paletteRepository->findPalettesByUsername($userId);

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

            // Verificar si la paleta ya existe en el array de paletas
            $existingPalette = array_filter($palettesArray, function ($palette) use ($paletteId) {
                return $palette['id'] == $paletteId;
            });

            // Si la paleta no existe, agregarla al array de paletas
            if (empty($existingPalette)) {
                $palettesArray[] = [
                    'id' => $paletteId,
                    'colors' => $color
                ];
            } else {    // Si la paleta existe, añade el color a su array de colores.
                $existingPaletteKey = key($existingPalette);
                $palettesArray[$existingPaletteKey]['colors'][] = $color;
            }
        }
        // Estructura final: Una lista de paletas. Cada paleta tiene id y colors. Colors es una lista de colores. Cada color tiene todo los datos.
        return new JsonResponse(['palettes' => $palettesArray], Response::HTTP_OK);
    }

}
