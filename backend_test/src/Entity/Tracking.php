<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
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

    #[ORM\OneToMany(mappedBy: 'tracking', targetEntity: ColorStat::class)]
    private Collection $colorStats;

    public function __construct()
    {
        $this->colorStats = new ArrayCollection();
    }

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

    /**
     * @return Collection<int, ColorStat>
     */
    public function getColorStats(): Collection
    {
        return $this->colorStats;
    }

    public function addColorStat(ColorStat $colorStat): static
    {
        if (!$this->colorStats->contains($colorStat)) {
            $this->colorStats->add($colorStat);
            $colorStat->setTracking($this);
        }

        return $this;
    }

    public function removeColorStat(ColorStat $colorStat): static
    {
        if ($this->colorStats->removeElement($colorStat)) {
            // set the owning side to null (unless already changed)
            if ($colorStat->getTracking() === $this) {
                $colorStat->setTracking(null);
            }
        }

        return $this;
    }
}
