<?php

namespace App\Message;

class Notification
{
    private string $email;
    private string $firstname;
    private string $lastname;
    private string $message;

    public function __construct(string $email, string $firstname, string $lastname, string $message )
    {
        $this->firstname = $firstname;
        $this->lastname = $lastname;
        $this->email = $email;
        $this->message = $message;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getFirstname(): string
    {
        return $this->firstname;
    }

    public function getLastname(): string
    {
        return $this->lastname;
    }

    public function getMessage(): string
    {
        return $this->message;
    }

    // public function __construct(private $content) {}

    // public function getContent(): array
    // {
    //     return $this->content;
    // }
}
