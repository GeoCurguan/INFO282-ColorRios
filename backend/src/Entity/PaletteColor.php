<?php

namespace App\Entity;

use App\Repository\PaletteColorRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PaletteColorRepository::class)]
class PaletteColor
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'paletteColors')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Palette $palette = null;

    #[ORM\ManyToOne(targetEntity: Color::class)]
    #[ORM\JoinColumn(name: "color_id", referencedColumnName: "id", nullable: false)]
    private ?Color $color = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPalette(): ?Palette
    {
        return $this->palette;
    }

    public function setPalette(?Palette $palette): static
    {
        $this->palette = $palette;

        return $this;
    }

    public function getColor(): ?Color
    {
        return $this->color;
    }

    public function setColor(?Color $color): static
    {
        $this->color = $color;

        return $this;
    }
}
