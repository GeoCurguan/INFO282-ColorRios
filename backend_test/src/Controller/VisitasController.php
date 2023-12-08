<?php
// src/Controller/VisitasController.php
namespace App\Controller;

use App\Entity\Visitas;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class VisitasController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function getVisitas(): JsonResponse
    {
        $visitasRepository = $this->entityManager->getRepository(Visitas::class);

        $visitas = $visitasRepository->findAll();

        $visitasData = [];

        foreach ($visitas as $visita) {
            $pageName = $visita->getPage();
            $visitsCount = $visita->getVisits();

            $visitasData[] = ['page' => $pageName, 'visits' => $visitsCount];
        }

        return new JsonResponse([$visitasData], Response::HTTP_OK);
    }
}
