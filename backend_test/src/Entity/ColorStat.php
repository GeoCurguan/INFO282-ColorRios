<?php

namespace App\Entity;

use App\Repository\ColorStatRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ColorStatRepository::class)]
class ColorStat
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $idColor = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $date = null;

    #[ORM\Column]
    private ?int $clicks = null;

    #[ORM\Column]
    private ?int $cantPalettes = null;

    #[ORM\ManyToOne(targetEntity: Tracking::class)]
    #[ORM\JoinColumn(name: "tracking_id", referencedColumnName: "id", nullable: false)]
    private ?Tracking $tracking = null;

    #[ORM\ManyToOne(targetEntity: Color::class)]
    #[ORM\JoinColumn(name: "id_color", referencedColumnName: "id", nullable: false)]
    private ?Color $color = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id): static
    {
        $this->id = $id;

        return $this;
    }

    public function getIdColor(): ?int
    {
        return $this->idColor;
    }

    public function setIdColor(int $idColor): static
    {
        $this->idColor = $idColor;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): static
    {
        $this->date = $date;

        return $this;
    }

    public function getClicks(): ?int
    {
        return $this->clicks;
    }

    public function setClicks(int $clicks): static
    {
        $this->clicks = $clicks;

        return $this;
    }

    public function getCantPalettes(): ?int
    {
        return $this->cantPalettes;
    }

    public function setCantPalettes(int $cantPalettes): static
    {
        $this->cantPalettes = $cantPalettes;

        return $this;
    }

    public function getTracking(): ?Tracking
    {
        return $this->tracking;
    }

    public function setTracking(?Tracking $tracking): static
    {
        $this->tracking = $tracking;

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
