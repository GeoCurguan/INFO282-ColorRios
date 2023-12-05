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
        // IMPORTANTE. HAY QUE ARREGLAR LA BASE DE DATOS PARA LOGRAR HACER ESTA CONSULTA!
        $qb = $this->createQueryBuilder('p');
        $qb->select('c', 'p.id')
           ->join('p.user', 'u')
           ->join('p.user', 'u');
           //etc...
        return $qb->GetQuery()->getResult();
    }

    public function findPalettesByUsername(string $username): array
    {
        $qb = $this->createQueryBuilder('p')
            ->select('p.id as paletteId', 'c.id as colorId', 'c.category', 'c.commune', 'c.season', 'c.colorName', 'c.image', 'c.ncsNuance', 'c.ncsHue', 'c.munsellHue', 'c.munsellValue', 'c.munsellChroma', 'c.munsellName', 'c.cielabL', 'c.cielabA', 'c.cielabB', 'c.rgbR', 'c.rgbG', 'c.rgbB', 'c.cmykC', 'c.cmykM', 'c.cmykY', 'c.cmykK', 'c.ceresitaName')
            ->join('p.palette_Color', 'pc')
            ->join('pc.color', 'c')
            ->join('p.user', 'u')
            ->where('u.username = :username')
            ->setParameter('username', $username);
        return $qb->getQuery()->getResult();
    }

}
