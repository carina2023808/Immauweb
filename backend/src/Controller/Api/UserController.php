<?php

namespace App\Controller\Api;

use App\Entity\User;
use App\Repository\UserRepository;
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


#[Route('/api/users/{id}', name: 'get_user_with_properties', methods: ['GET'])]
public function getUserWithProperties(UserRepository $userRepository, int $id): JsonResponse
{
    $user = $userRepository->find($id);

    if (!$user) {
        return new JsonResponse(['error' => 'User nes pas trouver!'], 404);
    }

    // Serializar o usuário com as propriedades
    $data = [
        'id' => $user->getId(),
        'firstname' => $user->getFirstname(),
        'lastname' => $user->getLastname(),
        'email' => $user->getEmail(),
        'imageName' => $user->getImageName(),
        'properties' => $user->getProperties()->map(function ($property) {
            return [
                'id' => $property->getId(),
                'title' => $property->getTitle(),
                'price' => $property->getPrice(),
                'adress' => $property->getAdress(),
                'propertyType' => $property->getPropertyType(),
                'listingType' => $property->getListingType(),
                'totalArea' => $property->getTotalArea(),
                'photos' => $property->getPropertyImages()->map(function ($image) {
                    return "https://localhost:8000/{$image->getFilename()}";
                })->toArray(),
            ];
        })->toArray()
    ];

    return new JsonResponse($data);
}

#[Route('/api/users/{id}/edit', name: 'api_edit', methods: ['PUT'])]
public function edit(Request $request, EntityManagerInterface $em, User $user): JsonResponse
{

    $data = json_decode($request->getContent(), true);
    $user->setFirstname($data['firstname']);
    $user->setLastname($data['lastname']);
    $user->setEmail($data['email']);
    $em->persist($user);
    $em->flush();
    return new JsonResponse(['status' => 'updated']);
}
#[Route('/api/users/{id}/delete', name: 'api_delete', methods: ['DELETE'])]
public function delete(Request $request, EntityManagerInterface $em, User $user)
{
    $em->remove($user);
    $em->flush();
    return new JsonResponse(['status' => 'deleted']);
}














}
