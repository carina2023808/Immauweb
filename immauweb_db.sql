-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 04, 2025 at 07:36 AM
-- Server version: 8.3.0
-- PHP Version: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `immauweb_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `advertisements`
--

DROP TABLE IF EXISTS `advertisements`;
CREATE TABLE IF NOT EXISTS `advertisements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `property_id` int NOT NULL,
  `contract_duration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `updated_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_5C755F1E549213EC` (`property_id`),
  KEY `IDX_5C755F1EA76ED395` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
CREATE TABLE IF NOT EXISTS `cities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`id`, `name`, `country`, `post_code`) VALUES
(3, 'Saint-Josse-ten-Noode', 'Belgique', '1040'),
(4, ' Woluwé-Saint-Pierre', 'belgique', '1150'),
(5, 'Bruxelles (Uccle)', 'Belgique', '1180'),
(6, 'Uccle', 'Belgique', '1180'),
(7, 'Etterbeek', 'Belgique', '1040'),
(8, 'Forest', 'Belgique', '1190'),
(9, 'Etterbeek', 'Belgique', '1140'),
(10, 'Bruxelles (Uccle)', 'Belgique', '1180');

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
CREATE TABLE IF NOT EXISTS `contacts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `updated_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `message` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `doctrine_migration_versions`
--

DROP TABLE IF EXISTS `doctrine_migration_versions`;
CREATE TABLE IF NOT EXISTS `doctrine_migration_versions` (
  `version` varchar(191) COLLATE utf8mb3_unicode_ci NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int DEFAULT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `doctrine_migration_versions`
--

INSERT INTO `doctrine_migration_versions` (`version`, `executed_at`, `execution_time`) VALUES
('DoctrineMigrations\\Version20251021094610', '2025-10-21 09:46:22', 114),
('DoctrineMigrations\\Version20251021095516', '2025-10-21 09:55:31', 130),
('DoctrineMigrations\\Version20251021101941', '2025-10-21 10:20:05', 77),
('DoctrineMigrations\\Version20251021122309', '2025-10-21 12:23:40', 865),
('DoctrineMigrations\\Version20251021122529', '2025-10-21 12:25:55', 253),
('DoctrineMigrations\\Version20251022082446', '2025-10-22 08:25:08', 1219),
('DoctrineMigrations\\Version20251022090122', '2025-10-22 09:01:36', 150),
('DoctrineMigrations\\Version20251024083835', '2025-10-24 08:38:49', 87),
('DoctrineMigrations\\Version20251024084043', '2025-10-24 08:40:58', 57);

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
CREATE TABLE IF NOT EXISTS `favorites` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `property_id` int NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `notes` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `IDX_E46960F5A76ED395` (`user_id`),
  KEY `IDX_E46960F5549213EC` (`property_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `messenger_messages`
--

DROP TABLE IF EXISTS `messenger_messages`;
CREATE TABLE IF NOT EXISTS `messenger_messages` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `body` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `headers` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue_name` varchar(190) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `available_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `delivered_at` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)',
  PRIMARY KEY (`id`),
  KEY `IDX_75EA56E0FB7336F0` (`queue_name`),
  KEY `IDX_75EA56E0E3BD61CE` (`available_at`),
  KEY `IDX_75EA56E016BA31DB` (`delivered_at`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `messenger_messages`
--

INSERT INTO `messenger_messages` (`id`, `body`, `headers`, `queue_name`, `created_at`, `available_at`, `delivered_at`) VALUES
(1, 'O:36:\\\"Symfony\\\\Component\\\\Messenger\\\\Envelope\\\":2:{s:44:\\\"\\0Symfony\\\\Component\\\\Messenger\\\\Envelope\\0stamps\\\";a:1:{s:46:\\\"Symfony\\\\Component\\\\Messenger\\\\Stamp\\\\BusNameStamp\\\";a:1:{i:0;O:46:\\\"Symfony\\\\Component\\\\Messenger\\\\Stamp\\\\BusNameStamp\\\":1:{s:55:\\\"\\0Symfony\\\\Component\\\\Messenger\\\\Stamp\\\\BusNameStamp\\0busName\\\";s:21:\\\"messenger.bus.default\\\";}}}s:45:\\\"\\0Symfony\\\\Component\\\\Messenger\\\\Envelope\\0message\\\";O:51:\\\"Symfony\\\\Component\\\\Mailer\\\\Messenger\\\\SendEmailMessage\\\":2:{s:60:\\\"\\0Symfony\\\\Component\\\\Mailer\\\\Messenger\\\\SendEmailMessage\\0message\\\";O:28:\\\"Symfony\\\\Component\\\\Mime\\\\Email\\\":6:{i:0;N;i:1;N;i:2;s:202:\\\"\n                <h1>New contact from Carina José</h1>\n                <p>Email: londoncarina2020@gmail.com</p>\n                <p>Message:</p>\n                <p>zefrreergergergergerg</p>\n            \\\";i:3;s:5:\\\"utf-8\\\";i:4;a:0:{}i:5;a:2:{i:0;O:37:\\\"Symfony\\\\Component\\\\Mime\\\\Header\\\\Headers\\\":2:{s:46:\\\"\\0Symfony\\\\Component\\\\Mime\\\\Header\\\\Headers\\0headers\\\";a:3:{s:4:\\\"from\\\";a:1:{i:0;O:47:\\\"Symfony\\\\Component\\\\Mime\\\\Header\\\\MailboxListHeader\\\":5:{s:50:\\\"\\0Symfony\\\\Component\\\\Mime\\\\Header\\\\AbstractHeader\\0name\\\";s:4:\\\"From\\\";s:56:\\\"\\0Symfony\\\\Component\\\\Mime\\\\Header\\\\AbstractHeader\\0lineLength\\\";i:76;s:50:\\\"\\0Symfony\\\\Component\\\\Mime\\\\Header\\\\AbstractHeader\\0lang\\\";N;s:53:\\\"\\0Symfony\\\\Component\\\\Mime\\\\Header\\\\AbstractHeader\\0charset\\\";s:5:\\\"utf-8\\\";s:58:\\\"\\0Symfony\\\\Component\\\\Mime\\\\Header\\\\MailboxListHeader\\0addresses\\\";a:1:{i:0;O:30:\\\"Symfony\\\\Component\\\\Mime\\\\Address\\\":2:{s:39:\\\"\\0Symfony\\\\Component\\\\Mime\\\\Address\\0address\\\";s:13:\\\"test@test.com\\\";s:36:\\\"\\0Symfony\\\\Component\\\\Mime\\\\Address\\0name\\\";s:12:\\\"Contact Form\\\";}}}}s:2:\\\"to\\\";a:1:{i:0;O:47:\\\"Symfony\\\\Component\\\\Mime\\\\Header\\\\MailboxListHeader\\\":5:{s:50:\\\"\\0Symfony\\\\Component\\\\Mime\\\\Header\\\\AbstractHeader\\0name\\\";s:2:\\\"To\\\";s:56:\\\"\\0Symfony\\\\Component\\\\Mime\\\\Header\\\\AbstractHeader\\0lineLength\\\";i:76;s:50:\\\"\\0Symfony\\\\Component\\\\Mime\\\\Header\\\\AbstractHeader\\0lang\\\";N;s:53:\\\"\\0Symfony\\\\Component\\\\Mime\\\\Header\\\\AbstractHeader\\0charset\\\";s:5:\\\"utf-8\\\";s:58:\\\"\\0Symfony\\\\Component\\\\Mime\\\\Header\\\\MailboxListHeader\\0addresses\\\";a:1:{i:0;O:30:\\\"Symfony\\\\Component\\\\Mime\\\\Address\\\":2:{s:39:\\\"\\0Symfony\\\\Component\\\\Mime\\\\Address\\0address\\\";s:26:\\\"londoncarina2020@gmail.com\\\";s:36:\\\"\\0Symfony\\\\Component\\\\Mime\\\\Address\\0name\\\";s:0:\\\"\\\";}}}}s:7:\\\"subject\\\";a:1:{i:0;O:48:\\\"Symfony\\\\Component\\\\Mime\\\\Header\\\\UnstructuredHeader\\\":5:{s:50:\\\"\\0Symfony\\\\Component\\\\Mime\\\\Header\\\\AbstractHeader\\0name\\\";s:7:\\\"Subject\\\";s:56:\\\"\\0Symfony\\\\Component\\\\Mime\\\\Header\\\\AbstractHeader\\0lineLength\\\";i:76;s:50:\\\"\\0Symfony\\\\Component\\\\Mime\\\\Header\\\\AbstractHeader\\0lang\\\";N;s:53:\\\"\\0Symfony\\\\Component\\\\Mime\\\\Header\\\\AbstractHeader\\0charset\\\";s:5:\\\"utf-8\\\";s:55:\\\"\\0Symfony\\\\Component\\\\Mime\\\\Header\\\\UnstructuredHeader\\0value\\\";s:19:\\\"New Contact Message\\\";}}}s:49:\\\"\\0Symfony\\\\Component\\\\Mime\\\\Header\\\\Headers\\0lineLength\\\";i:76;}i:1;N;}}s:61:\\\"\\0Symfony\\\\Component\\\\Mailer\\\\Messenger\\\\SendEmailMessage\\0envelope\\\";N;}}', '[]', 'default', '2025-10-28 11:19:59', '2025-10-28 11:19:59', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `properties`
--

DROP TABLE IF EXISTS `properties`;
CREATE TABLE IF NOT EXISTS `properties` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `city_id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `property_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `listing_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `adress` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_area` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` double NOT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `updated_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  PRIMARY KEY (`id`),
  KEY `IDX_87C331C7A76ED395` (`user_id`),
  KEY `IDX_87C331C78BAC62AF` (`city_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `properties`
--

INSERT INTO `properties` (`id`, `user_id`, `city_id`, `title`, `property_type`, `listing_type`, `description`, `adress`, `total_area`, `price`, `created_at`, `updated_at`) VALUES
(3, 1, 3, 'EU District- MADOU : Superbe appartement 2 chambres de 90M2', 'apartment', 'louer', 'Spacieux appartement situé à Saint-Josse-ten-Noode, dans le quartier EU-Madou, entre la Rue de la Loi et la Chaussée de Louvain.\r\nÀ proximité de nombreux commerces (Carrefour Express, restaurants de la Place Madou) et bien desservi par les transports en commun (Métro Madou – lignes 2 et 6, Tram 92 et 93, Bus 29/63/65/66).\r\n\r\nNous vous présentons cet appartement de 90m² (PEB) au 3ème étage d\'un immeuble historique avec très large ascenseur.', 'Rue Félix Hap 14', '89', 1025, '2025-10-28 10:26:28', '2025-10-30 11:59:32'),
(4, 1, 4, 'PROX. STOCKEL - BELLE MAISON RENOVEE 3 CH', 'maison', 'louer', 'Entre le Bvd de la Woluwe et Stockel, à 150m des commerces. Venez découvrir cette belle maison \"bel-étage\" remise à neuf en 2015, bénéficiant de tout ce que l\'on attend d\'une maison confortable et pratique! Hall d\'entrée avec wc invités, 1er salon d\'hiver/atelier/chambre d\'appoint/bureau, living en L avec FO donnant sur la terrasse Sud (+/- 20 m²), cuisine ent. équipée (four/Micro-ondes/taques gaz/frigo/surgélateur/LV), 3 chambres (15 m², 11m², 11m²), dressing et SDB. Jardin +/- 120 m² sud ! Cav', 'Av. Charles Thielemans 28', '120', 1950, '2025-10-28 10:29:09', '2025-10-30 12:01:23'),
(5, 1, 5, 'Appartement  à vendre', 'appartement', 'vendre', 'Situation :\r\n\r\nL\'apartment  est situe dans  d’un quartier résidentiel calme. Plusieurs écoles, commerces, centres sportifs et axes routiers sont facilement accessibles.\r\n\r\nGénéralités :\r\n\r\nConstruite en 1978, l\'appartement  offre une surface habitable de 180 m² (selon le DPE). Elle est chauffée à l’électricité et dispose d’une cheminée dans le séjour.', 'Av du messidor 123', '180', 890000, '2025-10-28 10:34:47', '2025-10-30 14:45:33'),
(6, 1, 6, 'Bel appartement 2 chambres', 'apartment', 'vendre', 'Bel appartement 2 chambres au cœur de Uccle\r\n\r\nSitué dans une rue calme à proximité immédiate de la Place du Parvis de Saint-Gilles, cet appartement lumineux de ±120 m² offre un cadre de vie agréable alliant confort et accessibilité.', 'Rue du Doyenné 78', '120', 480000, '2025-10-28 10:36:12', '2025-10-30 14:45:25'),
(7, 1, 7, 'Bel maison 4 chamber', 'house', 'vendre', 'Cette maison jumelée de 115 m² de surface habitable offre un fort potentiel pour ceux qui recherchent un projet de rénovation de caractère. Elle comprend actuellement deux chambres spacieuses et offre la possibilité d\'aménager une troisième chambre dans les combles.\r\n\r\nLa maison nécessite d\'importants travaux de rénovation, mais sa situation idéale, à proximité des écoles, des commerces et des transports en commun, en fait une opportunité parfaite pour les primo-accédants ou les bricoleurs.', 'Av. Commandant Lothaire 36', '341', 930000, '2025-10-28 10:36:15', '2025-10-30 14:45:09'),
(8, 1, 8, 'Stylish and spacious House for rent', 'house', 'louer', 'a spacious and stylish apartment overlooking the green park. A perfect combination of tranquility, style, and accessibility.\r\n\r\nUpon entering, you\'re immediately pleasantly surprised by a spacious entrance hall with a cloakroom that immediately sets the tone for the apartment: classy and well-maintained. The bright living room, finished with warm parquet flooring, offers a beautiful view of the green surroundings, ideal for unwinding after a busy day.\r\nAdjacent to the fitted kitchen is a terrace', 'Rue du Merlon 40', '112', 1800, '2025-10-30 08:49:12', '2025-10-30 11:08:03'),
(9, 1, 9, 'Appartement de luxe à louer à Etterbeek', 'maison', 'louer', 'Spacieuse réception avec un grand espace repas\r\n\r\nCuisine américaine contemporaine équipée d\'électroménager haut de gamme\r\n\r\nChambre principale avec dressing et salle de bains attenante\r\n\r\nPiscine et salle de cinéma\r\n\r\nDeux bureaux et deux salons TV\r\n\r\nVaste terrasse sur le toit idéale pour recevoir\r\n\r\nNombreux rangements\r\n\r\nPrésentée en parfait état', 'Rue de Tervaete 24', '320', 5400, '2025-10-30 13:59:28', '2025-10-30 13:59:28'),
(10, 7, 10, 'sddfhghip^p', 'maison', 'vendre', 'dyuiop^$uytresxcf', 'sdtyui', '120', 580000, '2025-11-03 08:13:06', '2025-11-03 08:13:06');

-- --------------------------------------------------------

--
-- Table structure for table `property_images`
--

DROP TABLE IF EXISTS `property_images`;
CREATE TABLE IF NOT EXISTS `property_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `property_id` int NOT NULL,
  `filename` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_9E68D116549213EC` (`property_id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `property_images`
--

INSERT INTO `property_images` (`id`, `property_id`, `filename`) VALUES
(7, 8, 'uploads/properties/6903268884961.jpg'),
(18, 3, 'uploads/properties/69034f059e264.jpg'),
(19, 9, 'uploads/properties/69036f4035d95.jpg'),
(20, 9, 'uploads/properties/69036f40373c7.jpg'),
(21, 9, 'uploads/properties/69036f4037d95.jpg'),
(22, 9, 'uploads/properties/69036f4038692.jpg'),
(23, 9, 'uploads/properties/69036f4039096.jpg'),
(24, 9, 'uploads/properties/69036f4039b27.jpg'),
(25, 4, 'uploads/properties/690375926388b.jpg'),
(26, 4, 'uploads/properties/6903759264672.jpg'),
(27, 4, 'uploads/properties/69037592653a1.jpg'),
(28, 4, 'uploads/properties/6903759265dc5.jpg'),
(29, 4, 'uploads/properties/6903759266775.jpg'),
(30, 7, 'uploads/properties/690376060d731.jpg'),
(31, 7, 'uploads/properties/690376060e5a8.jpg'),
(32, 7, 'uploads/properties/690376060f012.jpg'),
(33, 7, 'uploads/properties/690376060f9cc.jpg'),
(34, 7, 'uploads/properties/69037606103b7.jpg'),
(35, 3, 'uploads/properties/690376906d73e.jpg'),
(36, 3, 'uploads/properties/6903769071066.jpg'),
(37, 3, 'uploads/properties/6903769071a7d.jpg'),
(38, 3, 'uploads/properties/6903769072486.jpg'),
(39, 3, 'uploads/properties/6903769072dce.jpg'),
(40, 8, 'uploads/properties/690376efbd190.jpg'),
(41, 8, 'uploads/properties/690376efbe0ae.jpg'),
(42, 8, 'uploads/properties/690376efbeac3.jpg'),
(43, 8, 'uploads/properties/690376efbf4ec.jpg'),
(44, 8, 'uploads/properties/690376efbfeef.jpg'),
(45, 8, 'uploads/properties/690376efc0c48.jpg'),
(46, 8, 'uploads/properties/690376efc1604.jpg'),
(47, 6, 'uploads/properties/69037766ebaa1.jpg'),
(48, 6, 'uploads/properties/69037766ec8b8.jpg'),
(49, 6, 'uploads/properties/69037766ed2f6.jpg'),
(50, 6, 'uploads/properties/69037766eddda.jpg'),
(51, 6, 'uploads/properties/69037766ee7f4.jpg'),
(52, 6, 'uploads/properties/69037766ef24a.jpg'),
(53, 6, 'uploads/properties/69037766efd5c.jpg'),
(54, 5, 'uploads/properties/690378e5d4afe.jpg'),
(55, 5, 'uploads/properties/690378e5d5e66.jpg'),
(56, 5, 'uploads/properties/690378e5d6831.jpg'),
(57, 5, 'uploads/properties/690378e5d726f.jpg'),
(58, 10, 'uploads/properties/6908641221db9.jpg'),
(59, 10, 'uploads/properties/6908641222890.jpg'),
(60, 10, 'uploads/properties/6908641222e0d.jpg'),
(61, 10, 'uploads/properties/690864122331f.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `searches`
--

DROP TABLE IF EXISTS `searches`;
CREATE TABLE IF NOT EXISTS `searches` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_area` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_60183819A76ED395` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roles` json NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `updated_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `is_verified` tinyint(1) NOT NULL,
  `image_name` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_IDENTIFIER_EMAIL` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `roles`, `password`, `firstname`, `lastname`, `created_at`, `updated_at`, `is_verified`, `image_name`) VALUES
(1, 'londoncarina2020@gmail.com', '[]', '$2y$10$XBaC6YQMqToGirzY7RKdVeKUtBSW.RpQnYnxuUTYmM6L4xyvlMYg.', 'Carina', 'José', '2025-10-23 08:38:22', '2025-10-30 08:26:34', 1, 'uploads/users/6903213a4c599.png'),
(2, 'duniaJ@cfitech.be', '[]', '$2y$10$TDdpVTJ/Dl4NTZQuefnczecNHT2Sx8SDwd18otOEpfwzdebGMcxzO', 'Julien', 'Dunia', '2025-10-23 14:09:35', '2025-10-23 14:09:35', 1, 'uploads/default-user.png'),
(5, 'alex@cfitech.be', '[]', '$2y$10$dHLJ6.SIW2wbbWcgjAa4.ezHCu3vz4f6Sbo8hTrEqjhmTf7QhdaQO', 'Alex', 'Sales', '2025-10-31 09:11:43', '2025-10-31 09:11:43', 1, 'uploads/default-user.png'),
(6, 'azerty@uiiop.com', '[]', '$2y$10$/dzIsOuloGktsHiO928VlOUtXHMBUQgRaGgzBvMsdQsCwoXcXi6oy', 'azerty', 'uiopq', '2025-10-31 09:29:35', '2025-10-31 09:29:35', 1, 'uploads/default-user.png'),
(7, 'erica@cfitech', '[]', '$2y$10$YT8gbPBKuGYFxfZfNY/hL.OG1fDVpAuwezpgnU8PRK8Vlz.MzvE4.', 'Erica', 'Rodrigues', '2025-11-03 08:10:17', '2025-11-03 08:11:05', 1, 'uploads/users/69086399cb90f.webp');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `advertisements`
--
ALTER TABLE `advertisements`
  ADD CONSTRAINT `FK_5C755F1E549213EC` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`),
  ADD CONSTRAINT `FK_5C755F1EA76ED395` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `FK_E46960F5549213EC` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`),
  ADD CONSTRAINT `FK_E46960F5A76ED395` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `properties`
--
ALTER TABLE `properties`
  ADD CONSTRAINT `FK_87C331C78BAC62AF` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`),
  ADD CONSTRAINT `FK_87C331C7A76ED395` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `property_images`
--
ALTER TABLE `property_images`
  ADD CONSTRAINT `FK_9E68D116549213EC` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`);

--
-- Constraints for table `searches`
--
ALTER TABLE `searches`
  ADD CONSTRAINT `FK_60183819A76ED395` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
