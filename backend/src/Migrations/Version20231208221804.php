<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231208221804 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE palette (id INT AUTO_INCREMENT NOT NULL, nombre_propietario VARCHAR(255) NOT NULL, descargado TINYINT(1) NOT NULL, INDEX IDX_C7E5A77E74971827 (nombre_propietario), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE palette_color (id INT AUTO_INCREMENT NOT NULL, palette_id INT NOT NULL, color_id INT NOT NULL, INDEX IDX_6A00BA8D908BC74 (palette_id), INDEX IDX_6A00BA8D7ADA1FB5 (color_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE palette ADD CONSTRAINT FK_C7E5A77E74971827 FOREIGN KEY (nombre_propietario) REFERENCES `user` (username)');
        $this->addSql('ALTER TABLE palette_color ADD CONSTRAINT FK_6A00BA8D908BC74 FOREIGN KEY (palette_id) REFERENCES palette (id)');
        $this->addSql('ALTER TABLE palette_color ADD CONSTRAINT FK_6A00BA8D7ADA1FB5 FOREIGN KEY (color_id) REFERENCES color (id)');
        $this->addSql('ALTER TABLE colorStat CHANGE tracking_id tracking_id INT NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE palette DROP FOREIGN KEY FK_C7E5A77E74971827');
        $this->addSql('ALTER TABLE palette_color DROP FOREIGN KEY FK_6A00BA8D908BC74');
        $this->addSql('ALTER TABLE palette_color DROP FOREIGN KEY FK_6A00BA8D7ADA1FB5');
        $this->addSql('DROP TABLE palette');
        $this->addSql('DROP TABLE palette_color');
        $this->addSql('ALTER TABLE colorStat CHANGE tracking_id tracking_id INT DEFAULT NULL');
    }
}
