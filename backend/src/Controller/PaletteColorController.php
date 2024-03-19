<?php

namespace App\Controller;

use App\Entity\PaletteColor;
use App\Entity\Palette;
use App\Entity\Color;

use App\Repository\PaletteColorRepository;
use App\Repository\PaletteRepository;
use App\Repository\ColorRepository;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PaletteColorController extends AbstractController
{
    private $entityManager;
    private PaletteColorRepository $paletteColorRepository;

    public function __construct(EntityManagerInterface $entityManager, PaletteColorRepository $paletteColorRepository, PaletteRepository $paletteRepository, ColorRepository $colorRepository)
    {
        $this->entityManager = $entityManager;
        $this->paletteRepository = $paletteRepository;
        $this->paletteColorRepository = $paletteColorRepository;
        $this->colorRepository = $colorRepository;
    }

    public function countPalettes($colorId): JsonResponse
    {
        $paletteColorRepository = $this->entityManager->getRepository(PaletteColor::class);

        //Buscar PaletteColor por ID de color
        $paletteColors = $paletteColorRepository->findBy(['color' => $colorId]);

        //Contar la cantidad de paletas
        $palettesCount = count($paletteColors);

        return $this->json(['colorId' => $colorId, 'palettesCount' => $palettesCount]);
    }

    public function getPalettesColor (): JsonResponse
    {
        // Expected: /api/getPalettesColor
        // Bearer token: required
        // Method: GET

        // 1. Obtener palettes
        $palettes = $this->paletteRepository->findAll();
        $palettesArray = [];
        foreach ($palettes as $palette) {
            $palettesArray[] = [
                'id' => $palette->getId(),
                'nombre_propietario' => $palette->getNombrePropietario(),
                'descargado' => $palette->isDescargado(),
            ];
        }


        // palettesArray 
        // [{
        //     "id": 3,
        //     "nombre_propietario": "admin",
        //     "descargado": false
        //   }]

        // 2. Por cada palette, obtener los colores que le corresponden
        // palettesArray to json

        $palettesColor = [];
        foreach ($palettesArray as $palette) {
            $paletteColors = $this->paletteColorRepository->findBy(['palette' => $palette['id']]);

            $paletteColorsArray = [];
            foreach ($paletteColors as $paletteColor) {
                $paletteColorsArray[] = [
                    'id' => $paletteColor->getId(),
                    'color' => $paletteColor->getColor()->getId(),
                    'palette' => $paletteColor->getPalette()->getId(),
                ];
            }
            $palette['paletteColors'] = $paletteColorsArray;

            $palettesColor[] = [
                'id' => $palette['id'],
                'nombre_propietario' => $palette['nombre_propietario'],
                'descargado' => $palette['descargado'],
                'paletteColors' => $paletteColorsArray,
            ];
        }

        $palettesColorF = [];
        foreach ($palettesColor as $palette) {
            $paletteColorsArray = [];
        
            foreach ($palette['paletteColors'] as $paletteColor) {
                $color = $this->colorRepository->find($paletteColor['color']);
        
                $paletteColorsArray[] = [
                    'id' => $paletteColor['id'],
                    'color' => [
                        'id' => $color->getId(),
                        'category' => $color->getCategory(),
                        'commune' => $color->getCommune(),
                        'season' => $color->getSeason(),
                        'colorName' => $color->getColorName(),
                        'image' => $color->getImage(),
                        'ncsNuance' => $color->getNcsNuance(),
                        'ncsHue' => $color->getNcsHue(),
                        'munsellPage' => $color->getMunsellPage(),
                        'munsellHue' => $color->getMunsellHue(),
                        'munsellValue' => $color->getMunsellValue(),
                        'munsellChroma' => $color->getMunsellChroma(),
                        'munsellName' => $color->getMunsellName(),
                        'L*' => $color->getCielabL(),
                        'A*' => $color->getCielabA(),
                        'B*' => $color->getCielabB(),
                        'R' => $color->getRgbR(),
                        'G' => $color->getRgbG(),
                        'B' => $color->getRgbB(),
                        'C' => $color->getCmykC(),
                        'M' => $color->getCmykM(),
                        'Y' => $color->getCmykY(),
                        'K' => $color->getCmykK(),
                        'ceresita' => $color->getCeresitaName(),
                        'categoryName' => $color->getCategoryName(),
                        'rowId' => $color->getRowID(),
                    ],
                    'palette' => $paletteColor['palette'],
                ];
            }
        
            $palettesColorF[] = [
                'id' => $palette['id'],
                'nombre_propietario' => $palette['nombre_propietario'],
                'descargado' => $palette['descargado'],
                'paletteColors' => $paletteColorsArray,
            ];
        }
        
        // 4. Retornar los datos
        return new JsonResponse($palettesColorF, Response::HTTP_OK);
    }

}
