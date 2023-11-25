<?php

namespace App\Repository;

use App\Entity\ColorStat;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ColorStat>
 *
 * @method ColorStat|null find($id, $lockMode = null, $lockVersion = null)
 * @method ColorStat|null findOneBy(array $criteria, array $orderBy = null)
 * @method ColorStat[]    findAll()
 * @method ColorStat[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ColorStatRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ColorStat::class);
    }

//    /**
//     * @return ColorStat[] Returns an array of ColorStat objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('c.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?ColorStat
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
