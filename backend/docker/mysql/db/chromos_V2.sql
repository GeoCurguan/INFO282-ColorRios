CREATE TABLE `user` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `username` varchar(255) NOT NULL UNIQUE,
  `job` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `region` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
   roles longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '(DC2Type:json)' CHECK (json_valid(roles)),
  `commune` varchar(255) DEFAULT NULL
);


CREATE TABLE `palette` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `nombre_propietario` varchar(255),
  `nombre_palette` varchar(255),
  -- `id_usuario` int(11),
  -- `cantidad_colores` varchar(255),
  `descargado` bool
);


CREATE TABLE `color` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `category` varchar(255) DEFAULT NULL,
  `commune` varchar(255) DEFAULT NULL,
  `seasons` varchar(255) DEFAULT NULL,
  `colorName` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `ncsNuance` varchar(255) DEFAULT NULL,
  `ncsHue` varchar(255) DEFAULT NULL,
  `munsellPage` varchar(255) DEFAULT NULL,
  `munsellHue` varchar(255) DEFAULT NULL,
  `munsellValue` varchar(255) DEFAULT NULL,
  `munsellChroma` varchar(255)  DEFAULT NULL,
  `munsellName` varchar(255) DEFAULT NULL,
  `cielabL` int DEFAULT NULL,
  `cielabA` int DEFAULT NULL,
  `cielabB` int DEFAULT NULL,
  `rgbR` int DEFAULT NULL,
  `rgbG` int DEFAULT NULL,
  `rgbB` int DEFAULT NULL,
  `cmykC` int DEFAULT NULL,
  `cmykM` int DEFAULT NULL,
  `cmykY` int DEFAULT NULL,
  `cmykK` int DEFAULT NULL,
  `ceresitaName` varchar(255) DEFAULT NULL,
  `categoryName` varchar(255) DEFAULT NULL,
  `rowId` int NOT NULL
);

CREATE TABLE `palette_color` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `palette_id` int(11),
  `color_id` int(11)
);

CREATE TABLE `colorstat` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `id_color` int(11),
  `date` date,
  `clicks` int,
  `cant_palettes` int,
  `tracking_id` int(11)
);

CREATE TABLE `visitas` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `visits` varchar(255) DEFAULT NULL,
  `page` varchar(255)
);

CREATE TABLE `tracking` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `registro` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL
);

ALTER TABLE `palette` ADD FOREIGN KEY (`id_usuario`) REFERENCES `user` (`id`);

ALTER TABLE `palette_color` ADD FOREIGN KEY (`palette_id`) REFERENCES `palette` (`id`);

ALTER TABLE `palette_color` ADD FOREIGN KEY (`color_id`) REFERENCES `color` (`id`);

ALTER TABLE `colorstat` ADD FOREIGN KEY (`id_color`) REFERENCES `color` (`id`);

ALTER TABLE `colorstat` ADD FOREIGN KEY (`tracking_id`) REFERENCES `tracking` (`id`);