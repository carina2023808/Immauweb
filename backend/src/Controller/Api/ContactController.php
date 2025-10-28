<?php

namespace App\Controller\Api;

use App\Entity\Contact;
use App\Form\ContactForm;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;     // <- ✅ correto
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Mime\Address;
use Symfony\Component\Mailer\MailerInterface;


//events
// use Symfony\Componet\Messenger\MessageBusInterface;
use App\Message\Notification;
use Symfony\Component\Messenger\MessageBusInterface as MessengerMessageBusInterface;
use Symfony\Component\Mime\Message;

final class ContactController extends AbstractController
{
    #[Route('/contact', methods: ['POST','Get'], name: 'app_contact_create')]
    public function create(
        #[MapRequestPayload] ContactForm $contact,
        MailerInterface $mailer,
    ): JsonResponse
    {
        // 1) Se é válido -> enviar email
        $email = (new Email())
            ->from(new Address('test@test.com', 'Contact Form'))
            ->to($contact->email)
            ->subject('New Contact Message')
            ->html("
                <h1>New contact from {$contact->firstname} {$contact->lastname}</h1>
                <p>Email: {$contact->email}</p>
                <p>Message:</p>
                <p>{$contact->message}</p>
            ");

        try {
            $mailer->send($email);
            return $this->json([
                'status'  => 'success',
                'message' => 'Email sent successfully',
                'data'    => [
                    'firstname' => $contact->firstname,
                    'lastname'  => $contact->lastname,
                    'email'     => $contact->email,
                    'message'   => $contact->message,
                ]
            ], Response::HTTP_OK);

        } catch (TransportExceptionInterface $te) {

            return $this->json([
                'status' => 'error',
                'message' => 'Failed to send email',
                'details' => $te->getMessage(),
            ], Response::HTTP_BAD_REQUEST);
        }
    }
}
