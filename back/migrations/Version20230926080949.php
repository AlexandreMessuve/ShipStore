<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230926080949 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE `order` ADD reference VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE order_quantity DROP FOREIGN KEY FK_7E0BF487462F07AF');
        $this->addSql('DROP INDEX IDX_7E0BF487462F07AF ON order_quantity');
        $this->addSql('ALTER TABLE order_quantity CHANGE product_order_id order_id INT NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE order_quantity CHANGE order_id product_order_id INT NOT NULL');
        $this->addSql('ALTER TABLE order_quantity ADD CONSTRAINT FK_7E0BF487462F07AF FOREIGN KEY (product_order_id) REFERENCES `order` (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_7E0BF487462F07AF ON order_quantity (product_order_id)');
        $this->addSql('ALTER TABLE `order` DROP reference');
    }
}
