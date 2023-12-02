<?php

namespace App\Repository;

use App\Entity\Color;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Color>
 *
 * @method Color|null find($id, $lockMode = null, $lockVersion = null)
 * @method Color|null findOneBy(array $criteria, array $orderBy = null)
 * @method Color[]    findAll()
 * @method Color[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ColorRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Color::class);
    }

    public function findTopColorsByClicks(): array
    {
        $qb = $this->createQueryBuilder('c');
        $qb->select('c', 'cs.id as colorStatId', 'cs.date', 'cs.clicks')
           ->join('c.colorStats', 'cs')
           ->where('cs.date = (SELECT MAX(date) FROM App\Entity\ColorStat subcs WHERE subcs.id_color = c.id)')
           ->orderBy('cs.clicks', 'DESC')
           ->setMaxResults(3);

        return $qb->getQuery()->getResult();
    }

    public function findTopColorsByPalettes(): array
    {
        $qb = $this->createQueryBuilder('c');
        $qb->select('c', 'cs.id as colorStatId', 'cs.date', 'cs.cant_paletas')
           ->join('c.colorStats', 'cs')
           ->where('cs.date = (SELECT MAX(date) FROM App\Entity\ColorStat subcs WHERE subcs.id_color = c.id)')
           ->orderBy('cs.cant_paletas', 'DESC')
           ->setMaxResults(3);

        return $qb->getQuery()->getResult();
    }

    public function findTopColorsByClicksAndUsername(string $username): array
    {}

    public function findTopColorsByPalettesAndUsername(string $username): array
    {
        $qb = $this->createQueryBuilder('c');
        $qb->select('c', 'COUNT(pc.palette_id) as paletteCount')
        ->join('c.palettes', 'pc')
        ->join('pc.palette', 'p')
        ->join('p.user', 'u')
        ->where('u.username = :username')
        ->groupBy('c.id')
        ->orderBy('paletteCount', 'DESC')
        ->setMaxResults(3)
        ->setParameter('username', $username);

        return $qb->getQuery()->getResult();
    }

    //    /**
    //     * @return Color[] Returns an array of Color objects
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

    //    public function findOneBySomeField($value): ?Color
    //    {
    //        return $this->createQueryBuilder('c')
    //            ->andWhere('c.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
