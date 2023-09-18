<?php

namespace App\DataFixtures;

use App\Entity\Product;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker;

class AppFixtures extends Fixture
{
    /**
     * @throws \Exception
     */
    public function load(ObjectManager $manager): void
    {
        $faker = Faker\Factory::create('fr_FR');
        //Mise en place de faker
        for ($i = 0; $i < 20; $i++) {
            $product = new Product();
            $product->setName("Product$i")
                    ->setAddDate(date_create())
                    ->setPicture('https://media.gqmagazine.fr/photos/5b991e0a5e8dfe0011248866/16:9/w_2560%2Cc_limit/combien_co__te_la_fabrication_d_un_faucon_millenium___2949.jpeg')
                    ->setPrice(rand(10,100)/10)
                    ->setPurchaseNumber(0)
                    ->setStockNumber(rand(0,5))
                    ->setDescription("description$i");
            $manager->persist($product);
        }
        // $product = new Product();
        // $manager->persist($product);

        $manager->flush();
    }
}
