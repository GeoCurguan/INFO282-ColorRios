<?php

namespace App\Repository;

use App\Entity\PaletteColor;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<PaletteColor>
 *
 * @method PaletteColor|null find($id, $lockMode = null, $lockVersion = null)
 * @method PaletteColor|null findOneBy(array $criteria, array $orderBy = null)
 * @method PaletteColor[]    findAll()
 * @method PaletteColor[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PaletteColorRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PaletteColor::class);
    }

    
//    /**
//     * @return PaletteColor[] Returns an array of PaletteColor objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('p.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?PaletteColor
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
