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

    public function findTopClicks()
    {

        // SELECT c.*, cs.clicks
        // FROM ColorStat cs
        // JOIN Color c ON cs.id_color = c.id
        // ORDER BY cs.clicks DESC;

        return $this->createQueryBuilder('cs')
            ->select('c.id AS colorId, c.category, c.commune, c.season, c.colorName, c.image, c.ncsNuance, c.ncsHue, c.munsellPage, c.munsellHue, c.munsellValue, c.munsellChroma, c.munsellName, c.cielabL, c.cielabA, c.cielabB, c.rgbR, c.rgbG, c.rgbB, c.cmykC, c.cmykM, c.cmykY, c.cmykK, c.ceresitaName, c.categoryName, c.rowID, cs.clicks')
            ->innerJoin('cs.color', 'c')
            ->orderBy('cs.clicks', 'DESC')
            ->setMaxResults(3)
            ->getQuery()
            ->getResult();
            // ->innerJoin('c.color', 'color') // Join ColorStat (id_color) with Color (id)
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
