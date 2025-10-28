<?php

namespace App\MessageHandler;

use App\Entity\Contact;
use App\Message\Notification;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Messenger\Attribute\AsMessageHandler;
use Symfony\Component\Notifier\Notification\Notification as NotificationNotification;

#[AsMessageHandler]
final class MessageHandler
{
    private EntityManagerInterface $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function __invoke(Notification $message): void
    {
        $entity = new Contact();
        $entity->setFirstname($message->getFirstname());
        $entity->setLastname($message->getLastname());
        $entity->setEmail($message->getEmail());
        $entity->setMessage($message->getMessage());
        $entity->setCreatedAt(new \DateTimeImmutable());
        $entity->setUpdatedAt(new \DateTimeImmutable());

        $this->em->persist($entity);
        $this->em->flush();
    }
}
