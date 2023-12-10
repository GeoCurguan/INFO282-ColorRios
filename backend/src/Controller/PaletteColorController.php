<?php

namespace App\Controller;

use App\Entity\PaletteColor;
use App\Repository\PaletteColorRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PaletteColorController extends AbstractController
{
    private $entityManager;
    private PaletteColorRepository $paletteColorRepository;

    public function __construct(EntityManagerInterface $entityManager, PaletteColorRepository $paletteColorRepository)
    {
        $this->entityManager = $entityManager;
        $this->paletteColorRepository = $paletteColorRepository;
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
}
