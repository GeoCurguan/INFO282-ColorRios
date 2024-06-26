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

    public function findPalettesByUsername($username)
    {
        return $this->createQueryBuilder('p')
            ->select('p.id AS paletteId, p.nombre_palette, c.id AS colorId, c.category, c.commune, c.season, c.colorName, c.image, c.ncsNuance, c.ncsHue, c.munsellPage, c.munsellHue, c.munsellValue, c.munsellChroma, c.munsellName, c.cielabL, c.cielabA, c.cielabB, c.rgbR, c.rgbG, c.rgbB, c.cmykC, c.cmykM, c.cmykY, c.cmykK, c.ceresitaName, c.categoryName, c.rowID')
            ->innerJoin('p.paletteColors', 'pc')
            ->innerJoin('pc.color', 'c')
            ->where('p.nombre_propietario = :username')
            ->setParameter('username', $username)
            ->getQuery()
            ->getResult();
    }


    public function findTopPalettes()
    {
        return $this->createQueryBuilder('p')
            ->select('p.id AS paletteId, p.nombre_palette, p.nombre_propietario AS username, c.id AS colorId, c.category, c.commune, c.season, c.colorName, c.image, c.ncsNuance, c.ncsHue, c.munsellPage, c.munsellHue, c.munsellValue, c.munsellChroma, c.munsellName, c.cielabL, c.cielabA, c.cielabB, c.rgbR, c.rgbG, c.rgbB, c.cmykC, c.cmykM, c.cmykY, c.cmykK, c.ceresitaName, c.categoryName, c.rowID')
            ->innerJoin('p.paletteColors', 'pc')
            ->innerJoin('pc.color', 'c')
            // ->where('') // Condicion de mayor cantidad de likes o de fecha reciente
            // ->orderBy('','') // Talvez un orderBy(likes, DESC).
            ->setMaxResults(20)   // Creo necesario un limit para no mostrar TODAS las paletas.
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
