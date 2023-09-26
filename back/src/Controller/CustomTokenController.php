<?php

namespace App\Controller;

use App\Service\CustomTokenManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;

class CustomTokenController extends AbstractController
{
    public function generateCustomToken(CustomTokenManager $customTokenManager): JsonResponse
    {
        $user = $this->getUser(); // Obtenez l'utilisateur actuellement authentifié

        if (!$user) {
            throw $this->createNotFoundException('Utilisateur non trouvé');
        }

        $token = $customTokenManager->createCustomToken($user);

        return new JsonResponse(['token' => $token]);
    }
}
