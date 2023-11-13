<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: 'tracking')]
class Tracking
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'AUTO')]
    #[ORM\Column(type: 'integer')]
    private ?int $id;

    #[ORM\Column(type: 'string')]
    private string $registro;

    #[ORM\Column(type: 'datetime')]
    private \DateTimeInterface $createdAt;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getRegistro(): string
    {
        return $this->registro;
    }

    public function setRegistro(string $registro): self
    {
        $this->registro = $registro;

        return $this;
    }

    public function getCreatedAt(): \DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }
}
