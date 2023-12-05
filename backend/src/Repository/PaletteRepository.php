<?php

namespace App\Repository;

use App\Entity\Palette;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class PaletteRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Palette::class);
    }

    public function findTopPalettes(): array
    {
        // Muestra los colores de las paletas esten entre los Top 10 con mas LIKES?
        $qb = $this->createQueryBuilder('p');
        $qb->select('c', 'p.id')
           ->join('p.user', 'u')
           ->join('p.user', 'u')
    }

    public function findPalettesByUsername(string $username): array
    {
        // Muestra los colores de todas las paletas de un usuario especifico.
        $qb = $this->createQueryBuilder('p');
        $qb->select('p.id', 'c')
           ->join('p.user', 'u')
           ->join('p.colors', 'c')
           ->where('u.username = :username')
           ->orderBy('p.id', 'DESC')
           ->setParameter('username', $username);

        return $qb->getQuery()->getResult();
    }

    // Puedes agregar más métodos de consulta personalizados según las necesidades de tu aplicación.

}
