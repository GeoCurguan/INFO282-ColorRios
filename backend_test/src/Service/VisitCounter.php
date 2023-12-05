<?php

namespace App\Service;

use App\Entity\Visitas;
use App\Repository\VisitasRepository;
use Doctrine\ORM\EntityManagerInterface;

class VisitCounter
{
    private $visitRepository;
    private $entityManager;

    public function __construct(VisitasRepository $visitRepository, EntityManagerInterface $entityManager)
    {
        $this->visitRepository = $visitRepository;
        $this->entityManager = $entityManager;
    }

    public function countVisit(string $page)
    {
        $visit = $this->visitRepository->findOneBy(['page' => $page]);

        if ($visit) {
            $visit->setVisits($visit->getVisits() + 1);
        } else {
            $visit = new Visitas();
            $visit->setPage($page);
            $visit->setVisits(1);
            $this->entityManager->persist($visit);
        }

        $this->entityManager->flush();
    }
}
