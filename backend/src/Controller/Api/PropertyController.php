<?php

namespace App\Controller\Api;

use App\Entity\Property;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api/properties')]
class PropertyController extends AbstractController
{
    #[Route('', methods: ['GET'])]
    public function index(Request $request, EntityManagerInterface $em, SerializerInterface $serializer): JsonResponse
    {
        $repo = $em->getRepository(Property::class);
        $page = max(1, (int) $request->query->get('page', 1));
        $perPage = min(50, (int) $request->query->get('perPage', 12));

        $qb = $repo->createQueryBuilder('p')->orderBy('p.createdAt', 'DESC');
        $total = count($qb->getQuery()->getResult());
        $properties = $qb
            ->setFirstResult(($page - 1) * $perPage)
            ->setMaxResults($perPage)
            ->getQuery()
            ->getResult();

        $data = $serializer->serialize([
            'data' => $properties,
            'meta' => [
                'total' => $total,
                'page' => $page,
                'perPage' => $perPage
            ]
        ], 'json', ['groups' => ['prop:list']]);

        return JsonResponse::fromJsonString($data);
    }

    #[Route('/{id}', methods: ['GET'])]
    public function show(Property $property, SerializerInterface $serializer): JsonResponse
    {
        $json = $serializer->serialize($property, 'json', ['groups' => ['prop:detail']]);
        return JsonResponse::fromJsonString($json);
    }

    #[Route('', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        $data = json_decode($request->getContent(), true);

        $property = new Property();
        $property->setTitle($data['title'] ?? '');
        $property->setDescription($data['description'] ?? '');
        $property->setPrice($data['price'] ?? 0);
        $property->setPropertyType($data['type'] ?? '');
        $property->setCreatedAt(new \DateTimeImmutable());
        $property->setUpdatedAt(new \DateTimeImmutable());
        $property->setUser($this->getUser());

        $em->persist($property);
        $em->flush();

        return new JsonResponse(['id' => $property->getId()], 201);
    }


    #[Route(path: '/property/{id}/update', name: 'app_property_update', methods: ['PUT', 'PATCH'])]
    public function update(Property $property, Request $request, EntityManagerInterface $em): JsonResponse
    {
        if (!$this->getUser()) {
            return new JsonResponse(['error' => 'Unauthorized'], 401);
        }

        /** @var User $user */
        $user = $this->getUser();

        // Verifica se o usuário confirmou o email (se aplicável)
        if (method_exists($user, 'isVerified') && !$user->isVerified()) {
            return new JsonResponse(['error' => 'Please verify your email before updating a property.'], 403);
        }

        // Verifica se a propriedade pertence ao usuário logado
        $propertyOwner = $property->getUser();
        if (!$propertyOwner || $user->getEmail() !== $propertyOwner->getEmail()) {
            return new JsonResponse(['error' => 'You do not have permission to update this property.'], 403);
        }

        // Atualiza os dados da propriedade
        $data = json_decode($request->getContent(), true);

        if (isset($data['title'])) {
            $property->setTitle($data['title']);
        }
        if (isset($data['description'])) {
            $property->setDescription($data['description']);
        }
        if (isset($data['price'])) {
            $property->setPrice($data['price']);
        }
        if (isset($data['city'])) {
            $property->setCity($data['city']);
        }

        $em->persist($property);
        $em->flush();

        return new JsonResponse([
            'message' => 'Property updated successfully!',
            'property' => [
                'id' => $property->getId(),
                'title' => $property->getTitle(),
                'price' => $property->getPrice(),
            ],
        ]);
    }


    #[Route(path: '/{id}/delete', name: 'api_property_delete', methods: ['DELETE'])]
    public function delete(Property $property, EntityManagerInterface $em): JsonResponse
    {
        // Verifica se o usuário está autenticado
        $user = $this->getUser();

        if (!$user) {
            return new JsonResponse(['error' => 'You must be logged in to delete a property'], 401);
        }

        // Verifica se o usuário confirmou o e-mail (caso use verificação)
        // if (method_exists($user, 'isVerified') && !$user->isVerified()) {
        //     return new JsonResponse(['error' => 'You must verify your email to delete a property'], 403);
        // }

        // ...
        $user = $property->getUser();
        $email = $user ? $user->getEmail() : null;
        $isVerified = $user && method_exists($user, 'isVerified') ? $user->isVerified() : null;

        return new JsonResponse([
            'property_id' => $property->getId(),
            'user_email'  => $email,
            'user_verified' => $isVerified,
            // ... outros dados
        ]);



        // Verifica se o imóvel pertence ao usuário
        if ($property->getUser() === null) {
            return new JsonResponse(['error' => 'This property has no owner'], 400);
        }

        if ($user->getEmail() !== $property->getUser()->getEmail()) {
            return new JsonResponse([
                'error' => 'You must be ' . $property->getUser()->getEmail() . ' to delete this property'
            ], 403);
        }

        // Remove e confirma
        $title = $property->getTitle();
        $em->remove($property);
        $em->flush();

        return new JsonResponse([
            'success' => true,
            'message' => "The property '{$title}' has been successfully deleted!"
        ], 200);
    }
}
