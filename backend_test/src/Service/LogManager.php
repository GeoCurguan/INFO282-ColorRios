<?php

namespace App\Service;

use App\Entity\Tracking;
use Doctrine\ORM\EntityManagerInterface;

class LogManager
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function logEvent(string $eventName, array $data)
    {
        //Crear una nueva entidad Tracking
        $tracking = new Tracking();
        $tracking->setRegistro($eventName);
        $tracking->setCreatedAt(new \DateTime());

        //Persist y flush la entidad en la base de datos
        $this->entityManager->persist($tracking);
        $this->entityManager->flush();
    }
}
