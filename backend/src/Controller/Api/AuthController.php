<?php


namespace App\Controller\Api;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Validator\Constraints\UserPasswordValidator;

class AuthController extends AbstractController
{
    #[Route('/api/register', name: 'api_register', methods: ['POST'])]
    public function register(
        Request $request,
        UserPasswordHasherInterface $passwordHasher,
        EntityManagerInterface $em
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        $user = new User();
        $user->setFirstname($data['firstname']);
        $user->setLastname($data['lastname']);
        $user->setEmail($data['email']);
        $user->setIsVerified(false);
        $user->setRoles(['ROLE_USER']);
        $hashedPassword = $passwordHasher->hashPassword($user, $data['password']);
        $user->setPassword($hashedPassword);

        $em->persist($user);
        $em->flush();

        return new JsonResponse(['message' => 'User registered successfully']);
    }

    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    public function login(
        Request $request,
        UserRepository $repo,
        UserPasswordHasherInterface $passwordValidator
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);
        $user = $repo->findOneBy(['email' => $data['email']]);

        if (!$user) {
            return new JsonResponse(['error' => 'User not found'], 404);
        }

        if ($passwordValidator->isPasswordValid($user, $data['password']) !== true) {
            return new JsonResponse(['error' => 'Invalid credentials'], 401);
        }

        // Aqui normalmente você verificaria a senha e geraria um JWT
        // mas por simplicidade:
        return new JsonResponse([
            'id' => $user->getId(),
            'firstname' => $user->getFirstname(),
            'lastname' => $user->getLastname(),
            'email' => $user->getEmail(),
            'roles' => $user->getRoles(),
        ]);
    }
}
