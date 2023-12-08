<?php

namespace App\Entity;

use App\Repository\PaletteRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PaletteRepository::class)]
#[ORM\Table(name: 'palette')]
class Palette
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $nombre_propietario = null;

    #[ORM\Column]
    private ?bool $descargado = null;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(name: "nombre_propietario", referencedColumnName: "username")]
    private $propietario;

    #[ORM\OneToMany(mappedBy: 'palette', targetEntity: PaletteColor::class)]
    private Collection $paletteColors;

    public function __construct()
    {
        $this->paletteColors = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNombrePropietario(): ?string
    {
        return $this->nombre_propietario;
    }

    public function setNombrePropietario(string $nombre_propietario): static
    {
        $this->nombre_propietario = $nombre_propietario;

        return $this;
    }

    public function isDescargado(): ?bool
    {
        return $this->descargado;
    }

    public function setDescargado(bool $descargado): static
    {
        $this->descargado = $descargado;

        return $this;
    }

    public function getPropietario(): ?User
    {
        return $this->propietario;
    }

    public function setPropietario(?User $propietario): self
    {
        $this->propietario = $propietario;

        return $this;
    }

    /**
     * @return Collection<int, PaletteColor>
     */
    public function getPaletteColors(): Collection
    {
        return $this->paletteColors;
    }

    public function addPaletteColor(PaletteColor $paletteColor): static
    {
        if (!$this->paletteColors->contains($paletteColor)) {
            $this->paletteColors->add($paletteColor);
            $paletteColor->setPalette($this);
        }

        return $this;
    }

    public function removePaletteColor(PaletteColor $paletteColor): static
    {
        if ($this->paletteColors->removeElement($paletteColor)) {
            // set the owning side to null (unless already changed)
            if ($paletteColor->getPalette() === $this) {
                $paletteColor->setPalette(null);
            }
        }

        return $this;
    }
}
