<?php

namespace App\Entity;

use App\Entity\Traits\Timestampable;
use App\Repository\ContactRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: ContactRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[ORM\Table(name:"contacts")]
class Contact
{
    use Timestampable;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    #[Assert\NotBlank]
    private ?string $firstname = null;

    #[ORM\Column(length: 100)]
    #[Assert\NotBlank]
    private ?string $lastname = null;

    #[ORM\Column(length: 100)]
    #[Assert\NotBlank]
    #[Assert\Email]
    private ?string $email = null;

     #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $updatedAt = null;


    // #[ORM\Column(length: 20)]
    // #[Assert\NotBlank]
    // private ?string $phone = null;

    #[ORM\Column(length: 500)]
    #[Assert\NotBlank]
    private ?string $message = null;

    public function __construct()
    {
        // inicializações, se necessário
    }


    public function getId(): ?string
    {
        return $this->firstname;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function getMessage(): ?string
    {
        return $this->message;
    }


    //Setters
    public function setFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setLastname(): ?string
    {
        return $this->lastname;
    }

    public function setEmail(): ?string
    {
        return $this->email;
    }

    public function setMessage(): ?string
    {
        return $this->message;
    }
}
