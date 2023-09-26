<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class SecurityController extends AbstractController
{
    #[Route(path: '/login', name: 'app_login', methods: 'POST')]
    public function login(UserRepository $userRepository, Request $request, UserPasswordHasherInterface $userPasswordHasher): JsonResponse
    {
        $data = $request->getContent();
        $encoders = [new XmlEncoder(), new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];

        $serializer = new Serializer($normalizers, $encoders);
        $user = $serializer->deserialize($data, User::class, 'json');
        $user2 = $userRepository->findOneBy(['email' => $user->getEmail()]);
        if (!isset($user2)){
            return  new JsonResponse([
                'message' => 'email not found'
            ], 404);
        }
        if(!$userPasswordHasher->isPasswordValid($user2, $user->getPlainPassword())){
            return  new JsonResponse([
                'message' => 'password incorrect'
            ], 404);
        }

        return new JsonResponse([
            'message' => 'success',
            'user' => [
                'id' => $user2->getId(),
                'email' => $user2->getEmail(),
                'firstname' => $user2->getFirstname(),
                'lastname' => $user2->getLastname(),
                'phone' => $user2->getPhone(),
                'roles' => $user2->getRoles(),
            ]
        ], 200);

    }
}
