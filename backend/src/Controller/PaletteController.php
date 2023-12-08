<?php

namespace App\Controller;

use App\Entity\Palette;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class PaletteController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function insertPalette(Request $request): Response
    {
        // Assuming you have the necessary data in the request, adapt as needed
        $data = json_decode($request->getContent(), true);

        $palette = new Palette();
        $palette->setUserId($data['id_usuario']);
        $palette->setColorCount($data['cantidad_colores']);
        $palette->setDownloaded($data['descargado']);

        $this->entityManager->persist($palette);
        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Palette inserted successfully'], Response::HTTP_OK);
    }

    public function getPalettes(): JsonResponse
    {
        $paletteRepository = $this->entityManager->getRepository(Palette::class);
        $palettes = $paletteRepository->findAll();

        $palettesArray = [];

        foreach ($palettes as $palette) {
            $palettesArray[] = [
                'id' => $palette->getId(),
                'id_usuario' => $palette->getUserId(),
                'cantidad_colores' => $palette->getColorCount(),
                'descargado' => $palette->getDownloaded(),
            ];
        }

        return new JsonResponse(['palettes' => $palettesArray], Response::HTTP_OK);
    }

    // Add other methods as needed for specific functionalities related to the Palette entity

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





    public function getPalettesByUsername(string $username): JsonResponse
    {
        // Busca el repositorio
        $paletteRepository = $this->entityManager->getRepository(Palette::class);

        // Hace la consulta: Entrega hasta 10 paletas con mas ???.
        $result = $paletteRepository->findPalettesByUsername($username);

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
