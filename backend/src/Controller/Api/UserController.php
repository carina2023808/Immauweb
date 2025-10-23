<?php

namespace App\Controller\Api;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class UserController extends AbstractController
{


#[Route('/api/register', name: 'api_register', methods: ['POST'])]
public function register(Request $request, EntityManagerInterface $em)
{
    $data = json_decode($request->getContent(), true);
    $user = new User();
    $user->setFirstname($data['firstname']);
    $user->setLastname($data['lastname']);
    $user->setEmail($data['email']);
    $user->setPassword(password_hash($data['password'], PASSWORD_BCRYPT));
    $em->persist($user);
    $em->flush();
    return new JsonResponse(['status' => 'created']);
}

}
