<?php

namespace App\Form;


use Symfony\Component\Validator\Constraints as Assert;

final readonly class ContactForm
{
    public function __construct(
        #[Assert\NotBlank]
        public string $firstname,
        #[Assert\NotBlank]
        public string $lastname,
        #[Assert\NotBlank]
        #[Assert\Email]
        public string $email,
        #[Assert\NotBlank]
        public string $message,
    )
    {

    }
}
