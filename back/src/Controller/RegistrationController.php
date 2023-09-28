<?php

namespace App\Controller;

use App\Entity\Adress;
use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class RegistrationController extends AbstractController
{
    #[Route('/api/register', name: 'app_register', methods: 'POST')]
    public function register(Request $request,
                             UserPasswordHasherInterface $userPasswordHasher,
                             EntityManagerInterface $entityManager,
                             UserRepository $userRepository): Response
    {
        $json = $request->getContent();
        //$encoders = [new XmlEncoder(), new JsonEncoder()];
        //$normalizers = [new ObjectNormalizer()];

        $data = json_decode($json, JSON_OBJECT_AS_ARRAY);
        //on vérifie que tout les champs sont rempli
        if (isset($data)) {
            if (!empty($data['email'])
                && !empty($data['plainPassword'])
                    && !empty($data['firstname'])
                    && !empty($data['lastname'])
                    && !empty($data['phone'])
                    && !empty($data['adresse'])
                    && !empty($data['city'])
                    && !empty($data['postalCode'])
                    && !empty($data['country'])
            ){
                // on initialise le nouvel utilisateur
                $user = new User();
                $user->setEmail($data['email'])
                    ->setPlainPassword($data['plainPassword'])
                    ->setFirstname($data['firstname'])
                    ->setLastname($data['lastname'])
                    ->setPhone($data['phone']);
                //on vérifie si l'email est deja présente en bdd
                $user2 = $userRepository->findOneBy(['email' => $user->getEmail()]);
                if (isset($user2)){
                    return new Response('error email', 400);
                }else{
                    $adress = new Adress();
                    $adress->setStreet($data['adresse'])
                        ->setPostalCode($data['postalCode'])
                        ->setCity($data['city'])
                        ->setCountry($data['country'])
                        ->setUser($user);
                    // encode the plain password
                    $user->setPassword(
                        $userPasswordHasher->hashPassword(
                            $user,
                            $user->getPlainPassword()
                        )
                    )
                        ->eraseCredentials();

                    $entityManager->persist($user);
                    $entityManager->flush();

                    $entityManager->persist($adress);
                    $entityManager->flush();
                    // do anything else you need here, like send an email

                    return new Response('success', 201);
                }
            }
        }

        return new Response('error', 404);
    }
}
