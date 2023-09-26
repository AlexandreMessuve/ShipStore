<?php

namespace App\Controller;

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
        $data = $request->getContent();
        $encoders = [new XmlEncoder(), new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];

        $serializer = new Serializer($normalizers, $encoders);
        $user = $serializer->deserialize($data, User::class, 'json');


        //on vérifie que l'entité user n'est pas vide
        if (isset($user)) {
            if (!empty($user->getEmail()
                && !empty($user->getplainPassword()
                    && !empty($user->getFirstname())
                    && !empty($user->getLastname())
                    && !empty($user->getPhone())))){
                //on vérifie si l'email est deja présente en bdd
                $user2 = $userRepository->findOneBy(['email' => $user->getEmail()]);
                if (isset($user2)){
                    return new Response('error email', 400);
                }else{
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
                    // do anything else you need here, like send an email

                    return new Response('success', 201);
                }
            }
        }

        return new Response('error', 404);
    }
}
