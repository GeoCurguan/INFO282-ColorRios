<?php

namespace App\Entity;

use App\Repository\ColorRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ColorRepository::class)]
#[ORM\Table(name: 'color')]

class Color
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'AUTO')]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(name: "category", length: 255, nullable: true)]
    private ?string $category = null;

    #[ORM\Column(name: "commune", length: 255, nullable: true)]
    private ?string $commune = null;

    #[ORM\Column(name: "seasons", length: 255, nullable: true)]
    private ?string $season = null;

    #[ORM\Column(name: "colorName", length: 255, nullable: true)]
    private ?string $colorName = null;

    #[ORM\Column(name: "scientificName", length: 255, nullable: true)]
    private ?string $scientificName = null;

    #[ORM\Column(name: "image", length: 255, nullable: true)]
    private ?string $image = null;

    #[ORM\Column(name: "ncsNuance", length: 255, nullable: true)]
    private ?string $ncsNuance = null;

    #[ORM\Column(name: "ncsHue", length: 255, nullable: true)]
    private ?string $ncsHue = null;


    #[ORM\Column(name: "munsellPage", length: 255, nullable: true)]
    private ?string $munsellPage = null;

    #[ORM\Column(name: "munsellHue", length: 255, nullable: true)]
    private ?string $munsellHue = null;

    #[ORM\Column(name: "munsellValue", length: 255, nullable: true)]
    private ?string $munsellValue = null;

    #[ORM\Column(name: "munsellChroma", length: 255, nullable: true)]
    private ?string $munsellChroma = null;

    #[ORM\Column(name: "munsellName", length: 255, nullable: true)]
    private ?string $munsellName = null;

    #[ORM\Column(name: "cielabL", nullable: true)]
    private ?int $cielabL = null;

    #[ORM\Column(name: "cielabA", nullable: true)]
    private ?int $cielabA = null;

    #[ORM\Column(name: "cielabB", nullable: true)]
    private ?int $cielabB = null;

    #[ORM\Column(name: "rgbR", nullable: true)]
    private ?int $rgbR = null;

    #[ORM\Column(name: "rgbG", nullable: true)]
    private ?int $rgbG = null;

    #[ORM\Column(name: "rgbB", nullable: true)]
    private ?int $rgbB = null;

    #[ORM\Column(name: "cmykC", nullable: true)]
    private ?int $cmykC = null;

    #[ORM\Column(name: "cmykM", nullable: true)]
    private ?int $cmykM = null;

    #[ORM\Column(name: "cmykY", nullable: true)]
    private ?int $cmykY = null;

    #[ORM\Column(name: "cmykK", nullable: true)]
    private ?int $cmykK = null;

    #[ORM\Column(name: "ceresitaName", length: 255, nullable: true)]
    private ?string $ceresitaName = null;

    #[ORM\Column(name: "categoryName", length: 255, nullable: true)]
    private ?string $categoryName = null;

    #[ORM\Column(name: "rowId", nullable: false)]
    private ?int $rowID = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id): static
    {
        $this->id = $id;

        return $this;
    }

    public function getCategory(): ?string
    {
        return $this->category;
    }

    public function setCategory(?string $category): static
    {
        $this->category = $category;

        return $this;
    }

    public function getCommune(): ?string
    {
        return $this->commune;
    }

    public function setCommune(?string $commune): static
    {
        $this->commune = $commune;

        return $this;
    }

    public function getSeason(): ?string
    {
        return $this->season;
    }

    public function setSeason(?string $season): static
    {
        $this->season = $season;

        return $this;
    }

    public function getColorName(): ?string
    {
        return $this->colorName;
    }

    public function setColorName(?string $colorName): static
    {
        $this->colorName = $colorName;

        return $this;
    }

    public function getScientificName(): ?string
    {
        return $this->scientificName;
    }

    public function setScientificName(?string $scientificName): static
    {
        $this->scientificName = $scientificName;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(?string $image): static
    {
        $this->image = $image;

        return $this;
    }

    public function getNcsNuance(): ?string
    {
        return $this->ncsNuance;
    }

    public function setNcsNuance(?string $ncsNuance): static
    {
        $this->ncsNuance = $ncsNuance;

        return $this;
    }

    public function getNcsHue(): ?string
    {
        return $this->ncsHue;
    }

    public function setNcsHue(?string $ncsHue): static
    {
        $this->ncsHue = $ncsHue;

        return $this;
    }

    public function getMunsellHue(): ?string
    {
        return $this->munsellHue;
    }

    public function setMunsellHue(?string $munsellHue): static
    {
        $this->munsellHue = $munsellHue;

        return $this;
    }

    public function getMunsellValue(): ?string
    {
        return $this->munsellValue;
    }

    public function setMunsellValue(?string $munsellValue): static
    {
        $this->munsellValue = $munsellValue;

        return $this;
    }

    public function getMunsellChroma(): ?string
    {
        return $this->munsellChroma;
    }

    public function setMunsellChroma(?string $munsellChroma): static
    {
        $this->munsellChroma = $munsellChroma;

        return $this;
    }

    public function getMunsellName(): ?string
    {
        return $this->munsellName;
    }

    public function setMunsellName(?string $munsellName): static
    {
        $this->munsellName = $munsellName;

        return $this;
    }

    public function getCielabL(): ?int
    {
        return $this->cielabL;
    }

    public function setCielabL(?int $cielabL): static
    {
        $this->cielabL = $cielabL;

        return $this;
    }

    public function getCielabA(): ?int
    {
        return $this->cielabA;
    }

    public function setCielabA(?int $cielabA): static
    {
        $this->cielabA = $cielabA;

        return $this;
    }

    public function getCielabB(): ?int
    {
        return $this->cielabB;
    }

    public function setCielabB(?int $cielabB): static
    {
        $this->cielabB = $cielabB;

        return $this;
    }

    public function getRgbR(): ?int
    {
        return $this->rgbR;
    }

    public function setRgbR(?int $rgbR): static
    {
        $this->rgbR = $rgbR;

        return $this;
    }

    public function getRgbG(): ?int
    {
        return $this->rgbG;
    }

    public function setRgbG(?int $rgbG): static
    {
        $this->rgbG = $rgbG;

        return $this;
    }

    public function getRgbB(): ?int
    {
        return $this->rgbB;
    }

    public function setRgbB(?int $rgbB): static
    {
        $this->rgbB = $rgbB;

        return $this;
    }

    public function getCmykC(): ?int
    {
        return $this->cmykC;
    }

    public function setCmykC(?int $cmykC): static
    {
        $this->cmykC = $cmykC;

        return $this;
    }

    public function getCmykM(): ?int
    {
        return $this->cmykM;
    }

    public function setCmykM(?int $cmykM): static
    {
        $this->cmykM = $cmykM;

        return $this;
    }

    public function getCmykY(): ?int
    {
        return $this->cmykY;
    }

    public function setCmykY(?int $cmykY): static
    {
        $this->cmykY = $cmykY;

        return $this;
    }

    public function getCmykK(): ?int
    {
        return $this->cmykK;
    }

    public function setCmykK(?int $cmykK): static
    {
        $this->cmykK = $cmykK;

        return $this;
    }

    public function getCeresitaName(): ?string
    {
        return $this->ceresitaName;
    }

    public function setCeresitaName(?string $ceresitaName): static
    {
        $this->ceresitaName = $ceresitaName;

        return $this;
    }

    public function getCategoryName(): ?string
    {
        return $this->categoryName;
    }

    public function setCategoryName(?string $categoryName): static
    {
        $this->categoryName = $categoryName;

        return $this;
    }

    public function getMunsellPage(): ?string
    {
        return $this->munsellPage;
    }

    public function setMunsellPage(?string $munsellPage): static
    {
        $this->munsellPage = $munsellPage;

        return $this;
    }

    public function getRowID(): ?int
    {
        return $this->rowID;
    }

    public function setRowID(int $rowID): static
    {
        $this->rowID = $rowID;

        return $this;
    }
}
