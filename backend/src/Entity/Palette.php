<?php

namespace App\Entity;

use App\Repository\PaletteRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PaletteRepository::class)]
/**
 * @ORM\Entity
 * @ORM\Table(name="palette")
 */
class Palette
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'AUTO')]
    #[ORM\Column]
    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    private ?int $id = null;

    #[ORM\Column(name: "id_usuario", type: "integer", nullable: true)]
    private ?int $userId = null;

    #[ORM\Column(name: "cantidad_colores", length: 255, nullable: true)]
    private ?string $colorCount = null;

    #[ORM\Column(name: "descargado", type: "boolean", nullable: true)]
    private ?bool $downloaded = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id): static
    {
        $this->id = $id;

        return $this;
    }

    public function getUserId(): ?int
    {
        return $this->userId;
    }

    public function setUserId(?int $userId): static
    {
        $this->userId = $userId;

        return $this;
    }

    public function getColorCount(): ?string
    {
        return $this->colorCount;
    }

    public function setColorCount(?string $colorCount): static
    {
        $this->colorCount = $colorCount;

        return $this;
    }

    public function getDownloaded(): ?bool
    {
        return $this->downloaded;
    }

    public function setDownloaded(?bool $downloaded): static
    {
        $this->downloaded = $downloaded;

        return $this;
    }
}
