<?php

namespace App\Repository;

use App\Entity\OrderQauntity;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<OrderQauntity>
 *
 * @method OrderQauntity|null find($id, $lockMode = null, $lockVersion = null)
 * @method OrderQauntity|null findOneBy(array $criteria, array $orderBy = null)
 * @method OrderQauntity[]    findAll()
 * @method OrderQauntity[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class OrderQauntityRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, OrderQauntity::class);
    }

//    /**
//     * @return OrderQauntity[] Returns an array of OrderQauntity objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('o')
//            ->andWhere('o.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('o.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?OrderQauntity
//    {
//        return $this->createQueryBuilder('o')
//            ->andWhere('o.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
