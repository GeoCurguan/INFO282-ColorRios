<?php

namespace App\Repository;

use App\Entity\Palette;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Palette>
 *
 * @method Palette|null find($id, $lockMode = null, $lockVersion = null)
 * @method Palette|null findOneBy(array $criteria, array $orderBy = null)
 * @method Palette[]    findAll()
 * @method Palette[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PaletteRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Palette::class);
    }

    public function findPalettesByUserId($userId)
    {
        return $this->createQueryBuilder('p')
            ->select('p.id AS paletteId, c.id AS colorId, c.category, c.commune, c.seasons, c.colorName, c.image, c.ncsNuance, c.ncsHue, c.munsellPage, c.munsellHue, c.munsellValue, c.munsellChroma, c.munsellName, c.cielabL, c.cielabA, c.cielabB, c.rgbR, c.rgbG, c.rgbB, c.cmykC, c.cmykM, c.cmykY, c.cmykK, c.ceresitaName, c.categoryName, c.rowId')
            ->innerJoin('p.paletteColors', 'pc')
            ->innerJoin('pc.color', 'c')
            ->where('p.id_usuario = :userId')
            ->setParameter('userId', $userId)
            ->getQuery()
            ->getResult();
    }

//    /**
//     * @return Palette[] Returns an array of Palette objects
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

//    public function findOneBySomeField($value): ?Palette
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
