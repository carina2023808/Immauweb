<?php

namespace App\Controller\Api;

use App\Entity\Property;
use App\Entity\PropertyImage;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/properties')]
class PropertyImageController extends AbstractController
{
    #[Route('/{id}/image', name: 'app_property_image_upload', methods: ['POST'])]
    public function uploadImage(Property $property, Request $request, EntityManagerInterface $em): JsonResponse
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

        /** @var \App\Entity\User $user */
        $user = $this->getUser();

        // Proteção: só o dono ou admin pode adicionar imagem
        $owner = $property->getUser();
        if (!$owner || ($owner->getId() !== $user->getId() && !in_array('ROLE_ADMIN', $user->getRoles()))) {
            return new JsonResponse(['error' => 'forbidden'], 403);
        }

        $file = $request->files->get('file');
        if (!$file) {
            return new JsonResponse(['error' => 'no file'], 400);
        }

        // Cria pasta de upload se não existir
        $uploadsDir = $this->getParameter('kernel.project_dir') . '/public/uploads/properties';
        if (!is_dir($uploadsDir)) {
            mkdir($uploadsDir, 0775, true);
        }

        // Salva o arquivo com nome único
        $newName = uniqid() . '.' . $file->guessExtension();
        $file->move($uploadsDir, $newName);

        // Cria entidade PropertyImage
        $img = new PropertyImage();
        $img->setFilename('/uploads/properties/' . $newName);
        $img->setProperty($property);

        $em->persist($img);
        $em->flush();

        return new JsonResponse([
            'message' => 'Image uploaded successfully',
            'filename' => $img->getFilename(),
            'id' => $img->getId()
        ], 201);
    }
}
