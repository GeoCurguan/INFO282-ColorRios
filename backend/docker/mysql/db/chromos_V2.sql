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
  `id_usuario` int(11),
  `cantidad_colores` varchar(255),
  `descargado` bool
);


CREATE TABLE `color` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `category` varchar(255),
  `categoryName` varchar(255),
  `commune` varchar(255),
  `season` varchar(255),
  `colorName` varchar(255),
  `image` varchar(255),
  `ncsNuance` varchar(255),
  `ncsHue` varchar(255),
  `munsellHue` varchar(255),
  `munsellValue` varchar(255),
  `munsellChroma` varchar(255),
  `munsellName` varchar(255),
  `cielabL` int,
  `cielabA` int,
  `cielabB` int,
  `rgbR` int,
  `rgbG` int,
  `rgbB` int,
  `cmykC` int,
  `cmykM` int,
  `cmykY` int,
  `cmykK` int,
  `ceresitaName` varchar(255)
);
CREATE TABLE `palette_color` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `palette_id` int(11),
  `color_id` int(11)
);

CREATE TABLE `color_stat` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `id_color` int(11),
  `date` date,
  `clicks` int,
  `cant_paletas` int,
  `tracking_id` int(11)
);

CREATE TABLE `tracking` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `registro` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL
);

ALTER TABLE `palette` ADD FOREIGN KEY (`id_usuario`) REFERENCES `user` (`id`);

ALTER TABLE `palette_color` ADD FOREIGN KEY (`palette_id`) REFERENCES `palette` (`id`);

ALTER TABLE `palette_color` ADD FOREIGN KEY (`color_id`) REFERENCES `color` (`id`);

ALTER TABLE `color_stat` ADD FOREIGN KEY (`id_color`) REFERENCES `color` (`id`);

ALTER TABLE `color_stat` ADD FOREIGN KEY (`tracking_id`) REFERENCES `tracking` (`id`);