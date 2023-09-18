<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\RegistrationFormType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\Translation\TranslatorInterface;

class RegistrationController extends AbstractController
{
    #[Route('/api/register', name: 'app_register', methods: 'POST')]
    public function register(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager): JsonResponse | Response
    {
        $user = new User();
        $email = $request->query->get('email');
        $plainPassword = $request->query->get('plainPassword');

        if ($email != null && $plainPassword != null) {
            $user->setEmail($email);
            // encode the plain password
            $user->setPassword(
                $userPasswordHasher->hashPassword(
                    $user,
                    $plainPassword
                )
            );
            //$entityManager->persist($user);
            //$entityManager->flush();
            // do anything else you need here, like send an email

            return new JsonResponse([
                'code' => 200,
                'message' => 'success',
                'user' => [
                    'email' => $user->getEmail(),
                    'roles' => $user->getRoles(),
                ],
            ]);
        }
        return new Response('Error', 400);
    }
}
