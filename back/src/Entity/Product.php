<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\ProductRepository;
use Doctrine\DBAL\Types\Types;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProductRepository::class)]
#[ApiResource(
    operations : [
        new Get(),
        new GetCollection(),
    ],
    order: ['addDate' => 'DESC'],
    paginationEnabled: false,
)]


class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['product:list', 'product:item'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['product:list', 'product:item'])]
    private ?string $name = null;

    #[ORM\Column]
    #[Groups(['product:list', 'product:item'])]
    private ?float $price = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['product:list', 'product:item'])]
    private ?string $description = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['product:list', 'product:item'])]
    private ?\DateTimeInterface $addDate = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['product:list', 'product:item'])]
    private ?string $picture = null;

    #[ORM\Column]
    #[Groups(['product:list', 'product:item'])]
    private ?int $purchaseNumber = null;

    #[ORM\Column]
    #[Groups(['product:list', 'product:item'])]
    private ?int $stockNumber = null;




    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }


    public function getAddDate(): ?\DateTimeInterface
    {
        return $this->addDate;
    }

    public function setAddDate(\DateTimeInterface $addDate): static
    {
        $this->addDate = $addDate;

        return $this;
    }

    public function getPicture(): ?string
    {
        return $this->picture;
    }

    public function setPicture(string $picture): static
    {
        $this->picture = $picture;

        return $this;
    }

    public function getPurchaseNumber(): ?int
    {
        return $this->purchaseNumber;
    }

    public function setPurchaseNumber(int $purchaseNumber): static
    {
        $this->purchaseNumber = $purchaseNumber;

        return $this;
    }

    public function getStockNumber(): ?int
    {
        return $this->stockNumber;
    }

    public function setStockNumber(int $stockNumber): static
    {
        $this->stockNumber = $stockNumber;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): static
    {
        $this->price = $price;

        return $this;
    }
}
