-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         11.0.2-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para sorteo
DROP DATABASE IF EXISTS `sorteo`;
CREATE DATABASE IF NOT EXISTS `sorteo` /*!40100 DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci */;
USE `sorteo`;

-- Volcando estructura para tabla sorteo.admin
DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `correo` varchar(80) DEFAULT NULL,
  `usuario` varchar(50) DEFAULT NULL,
  `contrasena` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla sorteo.evento
DROP TABLE IF EXISTS `evento`;
CREATE TABLE IF NOT EXISTS `evento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_evento` varchar(100) DEFAULT NULL,
  `foto_evento` varchar(50) DEFAULT NULL,
  `empresa` varchar(100) DEFAULT NULL,
  `foto_empresa` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla sorteo.participantes
DROP TABLE IF EXISTS `participantes`;
CREATE TABLE IF NOT EXISTS `participantes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `cargo` varchar(100) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `foto` varchar(100) DEFAULT NULL,
  `evento_id` int(11) NOT NULL,
  `cedula` varchar(50) DEFAULT NULL,
  `participara` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cedula` (`cedula`),
  KEY `fk_evento_id` (`evento_id`),
  CONSTRAINT `fk_evento_id` FOREIGN KEY (`evento_id`) REFERENCES `evento` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla sorteo.sorteos
DROP TABLE IF EXISTS `sorteos`;
CREATE TABLE IF NOT EXISTS `sorteos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `jugado` tinyint(1) DEFAULT NULL,
  `premio` varchar(100) DEFAULT NULL,
  `premio_foto` varchar(100) DEFAULT NULL,
  `ganador_id` int(11) DEFAULT NULL,
  `evento_id` int(11) DEFAULT NULL,
  `nombre_ganador` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `evento_id` (`evento_id`),
  KEY `ganador_id` (`ganador_id`),
  CONSTRAINT `sorteos_ibfk_1` FOREIGN KEY (`evento_id`) REFERENCES `evento` (`id`) ON DELETE CASCADE,
  CONSTRAINT `sorteos_ibfk_2` FOREIGN KEY (`ganador_id`) REFERENCES `participantes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- La exportación de datos fue deseleccionada.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
