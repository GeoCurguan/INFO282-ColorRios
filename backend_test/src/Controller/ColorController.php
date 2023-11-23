<?php

namespace App\Controller;

use App\Entity\Color;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ColorController extends AbstractController
{
    public function insertarColor(Request $request, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);

        if (empty($data['values'])) {
            return new JsonResponse(['message' => 'Datos insuficientes en el JSON'], Response::HTTP_BAD_REQUEST);
        }

        foreach ($data['values'] as $colorData) {
            $color = new Color();
            $color->setCategory(isset($colorData[1]) ? $colorData[1] : null);
            $color->setCommune(isset($colorData[3]) ? $colorData[3] : null);
            $color->setSeason(isset($colorData[4]) ? $colorData[4] : null);
            $color->setColorName(isset($colorData[46]) ? $colorData[46] : null);
            $color->setNcsNuance(isset($colorData[25]) ? $colorData[25] : null);
            $color->setNcsHue(isset($colorData[26]) ? $colorData[26] : null);
            $color->setMunsellPage(isset($colorData[27]) ? $colorData[27] : null);
            $color->setMunsellHue(isset($colorData[28]) ? $colorData[28] : null);
            $color->setMunsellValue(isset($colorData[29]) ? $colorData[29] : null);
            $color->setMunsellChroma(isset($colorData[30]) ? $colorData[30] : null);
            $color->setMunsellName(isset($colorData[31]) ? $colorData[31] : null);
            $color->setCielabL(isset($colorData[32]) ? (int)$colorData[32] : null);
            $color->setCielabA(isset($colorData[33]) ? (int)$colorData[33] : null);
            $color->setCielabB(isset($colorData[34]) ? (int)$colorData[34] : null);
            $color->setRgbR(isset($colorData[36]) ? (int)$colorData[36] : null);
            $color->setRgbG(isset($colorData[37]) ? (int)$colorData[37] : null);
            $color->setRgbB(isset($colorData[38]) ? (int)$colorData[38] : null);
            $color->setCmykC(isset($colorData[39]) ? (int)$colorData[39] : null);
            $color->setCmykM(isset($colorData[40]) ? (int)$colorData[40] : null);
            $color->setCmykY(isset($colorData[41]) ? (int)$colorData[41] : null);
            $color->setCmykK(isset($colorData[42]) ? (int)$colorData[42] : null);
            $color->setCeresitaName(isset($colorData[43]) ? $colorData[43] : null);
            $color->setCategoryName(isset($colorData[1]) ? $colorData[1] : null);

            $entityManager->persist($color);
        }

        $entityManager->flush();

        return new JsonResponse(['message' => 'Colores insertados'], Response::HTTP_OK);
    }
}
