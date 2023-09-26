<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use App\Repository\OrderRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\Ignore;

#[ORM\Entity(repositoryClass: OrderRepository::class)]
#[ORM\Table(name: '`order`')]
class Order
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[Groups('order')]
    #[ORM\Column]
    private ?int $id = null;

    #[Ignore]
    #[ORM\ManyToMany(targetEntity: Product::class)]
    private Collection $ProductList;

    #[Ignore]
    #[ORM\ManyToOne(inversedBy: 'orders')]
    private ?User $user = null;

    #[Groups('order')]
    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $dateOrder = null;

    #[Groups('order')]
    #[ORM\Column]
    private ?float $price = null;

    #[Groups('order')]
    #[ORM\Column(length: 255)]
    private ?string $reference = null;

    public function __construct()
    {
        $this->ProductList = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection<int, Product>
     */
    public function getProductList(): Collection
    {
        return $this->ProductList;
    }

    public function addProductList(Product $productList): static
    {
        if (!$this->ProductList->contains($productList)) {
            $this->ProductList->add($productList);
        }

        return $this;
    }

    public function removeProductList(Product $productList): static
    {
        $this->ProductList->removeElement($productList);

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $User): static
    {
        $this->user = $User;

        return $this;
    }

    public function getDateOrder(): ?\DateTimeInterface
    {
        return $this->dateOrder;
    }

    public function setDateOrder(\DateTimeInterface $dateOrder): static
    {
        $this->dateOrder = $dateOrder;

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

    public function getReference(): ?string
    {
        return $this->reference;
    }

    public function setReference(string $reference): static
    {
        $this->reference = $reference;

        return $this;
    }

}
