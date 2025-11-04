<?php

namespace App\Controller\Api;

use App\Entity\City;
use App\Entity\Property;
use App\Entity\PropertyImage;
use App\Repository\PropertyRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api/properties')]
class PropertyController extends AbstractController
{
    #[Route('', methods: ['GET'])]
    public function index(Request $request, EntityManagerInterface $em, SerializerInterface $serializer, PropertyRepository $repo): JsonResponse
    {

        // Récupérer les 5 dernières propriétés ajoutées
        // $properties= $repo->findBy([], ['createdAt' => 'DESC'], 5, 0);
        // return $this->json($properties);

        $type = $request->query->get('type', 'vendre');

        // $repo = $em->getRepository(Property::class);
        $page = max(1, (int) $request->query->get('page', 1));
        $perPage = min(50, (int) $request->query->get('perPage', 12));

        //cria o query builder para bsucar as propriedades
        $qb = $repo->createQueryBuilder('p')
            ->where('p.listingType = :type')
            ->setParameter('type', $type)
            ->orderBy('p.createdAt', 'DESC');

        //conta o total de propriedades
        $total = count($qb->getQuery()->getResult());

        //pega as propriedades da pagina atual
        $properties = $qb
            ->setFirstResult(($page - 1) * $perPage)
            ->setMaxResults($perPage)
            ->getQuery()
            ->getResult();

        $data = $serializer->serialize([
            'data' => array_map(function (Property $property) use ($serializer) {
                return [
                    'id' => $property->getId(),
                    'title' => $property->getTitle(),
                    'description' => $property->getDescription(),
                    'price' => $property->getPrice(),
                    'propertyType' => $property->getPropertyType(),
                    'listingType' => $property->getListingType(),
                    'address' => $property->getAdress(),
                    'totalArea' => $property->getTotalArea(),
                    'city' => $property->getCity() ? $property->getCity()->getName() : null,
                    'country' => $property->getCity() ? $property->getCity()->getCountry() : null,
                    'postCode' => $property->getCity() ? $property->getCity()->getPostCode() : null,
                    'photos' => array_map(function (PropertyImage $img) {
                        return 'https://localhost:8000/' . $img->getFilename();
                    }, $property->getPropertyImages()->toArray()),
                ];
            }, $properties),
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
        return $this->json([
                    'id' => $property->getId(),
            'title' => $property->getTitle(),
            'description' => $property->getDescription(),
            'price' => $property->getPrice(),
            'propertyType' => $property->getPropertyType(),
            'listingType' => $property->getListingType(),
            'address' => $property->getAdress(),
            'totalArea' => $property->getTotalArea(),
            'city' => $property->getCity() ? $property->getCity()->getName() : null,
            'country' => $property->getCity() ? $property->getCity()->getCountry() : null,
            'postCode' => $property->getCity() ? $property->getCity()->getPostCode() : null,
            'photos' => array_map(function (PropertyImage $img) {
                return 'https://localhost:8000/' . $img->getFilename();
            }, $property->getPropertyImages()->toArray()),
        ]);
    }

    #[Route('', methods: ['POST'])]
    public function create(
        Request $request,
        EntityManagerInterface $em,
        UserRepository $userRepository,
    ): JsonResponse {
        // $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        $data = $request->request->all();
        $userId = $data['userId'];
        $user = $userRepository->find((int)$userId);

        // City
        $city = (new City())
            ->setName($data['city'] ?? '')
            ->setCountry($data['country'] ?? '')
            ->setPostCode($data['postCode'] ?? '');
        $em->persist($city);

        // Property
        $property = new Property();
        $property->setTitle($data['title'] ?? '');
        $property->setDescription($data['description'] ?? '');
        $property->setPrice($data['price'] ?? 0);
        $property->setPropertyType($data['propertyType'] ?? '');
        $property->setListingType($data['listingType'] ?? '');
        $property->setAdress($data['address'] ?? '');
        $property->setTotalArea($data['totalArea'] ?? '');
        $property->setCity($city);
        $property->setCreatedAt(new \DateTimeImmutable());
        $property->setUpdatedAt(new \DateTimeImmutable());
        $property->setUser($user);

        $em->persist($property);

        // Image
        $images = $request->files->all('images');

        foreach ($images as $image) {
            $newFilename = uniqid() . '.' . $image->guessExtension();

            // Sauvegarder l'image dans le dossier
            $image->move(
                "uploads/properties",
                $newFilename
            );

            // Base de données
            $imageModel = (new PropertyImage())
                ->setFilename("uploads/properties/$newFilename")
                ->setProperty($property);
            $em->persist($imageModel);
        }


        $em->flush();

        return new JsonResponse(['id' => $property->getId()], 201);
    }


    #[Route(path: '/property/{id}/update', name: 'app_property_update', methods: ['POST'])]
    public function update(Property $property, Request $request, EntityManagerInterface $em, UserRepository $userRepository): JsonResponse
    {
        // Atualiza os dados da propriedade
        $data = $request->request->all();

        $userId = $data['userId'];

        $user = $userRepository->find((int)$userId);

        if (!$user) {
            return new JsonResponse(['error' => 'Unauthorized'], 401);
        }

        /** @var User $user */

        // Verifica se o usuário confirmou o email (se aplicável)
        if (method_exists($user, 'isVerified') && !$user->isVerified()) {
            return new JsonResponse(['error' => 'Please verify your email before updating a property.'], 403);
        }

        // Verifica se a propriedade pertence ao usuário logado
        $propertyOwner = $property->getUser();
        if (!$propertyOwner || $user->getEmail() !== $propertyOwner->getEmail()) {
            return new JsonResponse(['error' => 'You do not have permission to update this property.'], 403);
        }

        if (isset($data['title'])) {
            $property->setTitle($data['title']);
        }

        if (isset($data['propertyType'])) {
            $property->setPropertyType($data['propertyType']);
        }

        if (isset($data['listingType'])) {
            $property->setListingType($data['listingType']);
        }

        if (isset($data['description'])) {
            $property->setDescription($data['description']);
        }

        if (isset($data['address'])) {
            $property->setAdress($data['address']);
        }

        if (isset($data['city'])) {
            // Supondo que city é uma entidade relacionada
            $city = $property->getCity();
            $city->setName($data['city']);
            $property->setCity($city);
        }

        if (isset($data['postCode'])) {
            $city = $property->getCity();
            $city->setPostCode($data['postCode']);
            $property->setCity($city);
        }

        if (isset($data['country'])) {
            $city->setCountry($data['country']);
        }

        if (isset($data['totalArea'])) {
            $property->setTotalArea($data['totalArea']);
        }

        if (isset($data['price'])) {
            $property->setPrice($data['price']);
        }

        $em->persist($property);

        // Image
        $images = $request->files->all('photos');

        foreach ($images as $image) {
            $newFilename = uniqid() . '.' . $image->guessExtension();

            // Sauvegarder l'image dans le dossier
            $image->move(
                "uploads/properties",
                $newFilename
            );

            // Base de données
            $imageModel = (new PropertyImage())
                ->setFilename("uploads/properties/$newFilename")
                ->setProperty($property);
            $em->persist($imageModel);
        }


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

    // Verifica se a propriedade tem um dono
    if ($property->getUser() === null) {
        return new JsonResponse(['error' => 'This property has no owner'], 400);
    }

    // Verifica se o usuário logado é o dono da propriedade
    // if ($user->getEmail() !== $property->getUser()->getEmail()) {
    //     return new JsonResponse([
    //         'error' => 'You are not authorized to delete this property. Only the owner can delete it.'
    //     ], 403);
    // }

    // Salva o título antes de deletar
    $title = $property->getTitle();

    // Remove a propriedade
    $em->remove($property);
    $em->flush();

    return new JsonResponse([
        'success' => true,
        'message' => "The property '{$title}' has been successfully deleted!"
    ], 200);
}



// #[Route('/api/properties/latest', name: 'api_properties_latest', methods: ['GET'])]
// public function getLatest(Request $request, PropertyRepository $propertyRepository): JsonResponse
// {
//     $limit = $request->query->getInt('limit', 3);

//     // Busca as últimas propriedades ordenadas por ID descendente
//     $properties = $propertyRepository->findBy(
//         [],
//         ['id' => 'DESC'], // ou ['createdAt' => 'DESC'] se você tiver esse campo
//         $limit
//     );

//     $data = [];
//     foreach ($properties as $property) {
//         $photos = [];
//         foreach ($property->getPhotos() as $photo) {
//             $photos[] = $request->getSchemeAndHttpHost() . '/uploads/properties/' . $photo->getFilename();
//         }

//         $data[] = [
//             'id' => $property->getId(),
//             'title' => $property->getTitle(),
//             'propertyType' => $property->getPropertyType(),
//             'listingType' => $property->getListingType(),
//             'description' => $property->getDescription(),
//             'address' => $property->getAddress(),
//             'city' => $property->getCity(),
//             'postCode' => $property->getPostCode(),
//             'country' => $property->getCountry(),
//             'totalArea' => $property->getTotalArea(),
//             'price' => $property->getPrice(),
//             'photos' => $photos,
//         ];
//     }

//     return new JsonResponse($data);
// }

}

