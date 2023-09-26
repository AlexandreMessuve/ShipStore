<?php

namespace App\Controller;

use App\Entity\Order;
use App\Entity\OrderQuantity;
use App\Entity\Product;
use App\Repository\OrderQauntityRepository;
use App\Repository\OrderQuantityRepository;
use App\Repository\OrderRepository;
use App\Repository\ProductRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Context\Normalizer\ObjectNormalizerContextBuilder;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\AbstractObjectNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Validator\Constraints\Timezone;

class OrderController extends AbstractController
{
    /**
     * @param Request $request
     * @param ProductRepository $repository
     * @param EntityManagerInterface $manager
     * @param UserRepository $userRepository
     * @return Response
     */
    #[Route('/api/confirm/order', name: 'app_order', methods: 'POST')]
    public function index(Request $request, ProductRepository $repository, EntityManagerInterface $manager, UserRepository $userRepository): Response
    {
        $encoders = [new XmlEncoder(), new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];

        $serializer = new Serializer($normalizers, $encoders);
        $user = $this->getUser();
        $user = $userRepository->findOneBy(['email' => $user->getUserIdentifier()]);
        //on créait une nouvelle commande
        $order = new Order();

        //on récupère l'utilisateur connécté

        $order->setUser($user)
                ->setDateOrder(date_create())
                ->setReference(uniqid(date_create()->format('dmY').'-'));

        //on récupère les données reçus'
        $json = $request->getContent();

        //on décode le json pour le transformer en tableau
        $data = json_decode($json, JSON_OBJECT_AS_ARRAY);
        $orders = $data['orders'];
        $price = $data['price'];
        $order->setPrice($price);
        $quantity = [];

        //boucle qui permet de savoir la quantité
        for ($i = 0; $i < count($orders); $i++) {
                $quantity[$i] = $orders[$i]['quantity'];
        }
        for ($i = 0; $i < count($orders); $i++) {
            $id = $orders[$i]['id'];
            $product = $repository->findOneBy(['id' => $id]);
            $order->addProductList($product);
            $orderQuantity = new OrderQuantity();
            $orderQuantity->setQuantity($quantity[$i])
                        ->setProductId($id)
                        ->setRefOrder($order->getReference());
            $manager->persist($orderQuantity);
        }
        $manager->persist($order);
        $manager->flush();
        $json = [
            'code' => 201,
            'message' => 'success'
        ];
        return new Response(json_encode($json, 201));
    }


    /**
     * @param UserRepository $userRepository
     * @param OrderRepository $orderRepository
     * @return Response
     */
    #[Route('/api/user/order', name: 'app_get_order', methods: 'GET')]
    public function getUserOrder(UserRepository $userRepository, OrderRepository $orderRepository, OrderQuantityRepository $quantityRepository): Response{
        $user = $this->getUser();
        $user = $userRepository->findOneBy(['email' => $user->getUserIdentifier()]);
        $orders = $orderRepository->findBy(['user' => $user]);

        $json = [
            'code' => 200,
            'message' => 'Success',
            'user' => [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'firstname' => $user->getFirstname(),
                'lastname' => $user->getLastname(),
                'phone' => $user->getPhone(),
                'orders' => []
            ]
        ];
        if (isset($orders)){
            $i = 0;
            $j = 0;
            foreach ($orders as $order) {
                $productsQuantity = $quantityRepository->findBy(['refOrder' => $order->getReference()]);
                $productLists = $order->getProductList();
                $json['user']['orders'][$i] = [
                    'orderId' => $order->getId(),
                    'ref' => $order->getReference(),
                    'price' => $order->getPrice(),
                    'dateOrder' => $order->getDateOrder()->format('d/m/Y H:i'),
                    'products' => [],
                    'productsQuantity' => []
                ];
                foreach ($productLists as $product){
                    $json['user']['orders'][$i]['products'][$j] = [
                        'productId' => $product->getId(),
                        'name' => $product->getName(),
                        'description' => $product->getDescription(),
                        'price' => $product->getPrice(),
                        'imgUrl' => $product->getPicture()
                    ];
                    $j++;
                }
                $j = 0;
                foreach ($productsQuantity as $productQuantity){
                    $json['user']['orders'][$i]['productsQuantity'][$j] = [
                        'productId' => $productQuantity->getProductId(),
                        'orderRef' => $productQuantity->getRefOrder(),
                        'quantity' => $productQuantity->getQuantity()
                    ];
                    $j++;
                }
                $j = 0;
                $i++;
            };
        }


        return new Response(json_encode($json));
    }
}
