-- MariaDB dump 10.19  Distrib 10.11.3-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: sorteo
-- ------------------------------------------------------
-- Server version	10.11.3-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `correo` varchar(80) DEFAULT NULL,
  `usuario` varchar(50) DEFAULT NULL,
  `contrasena` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES
(1,'leal@protonmail.com','admin','cont');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evento`
--

DROP TABLE IF EXISTS `evento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `evento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_evento` varchar(100) DEFAULT NULL,
  `foto_evento` varchar(50) DEFAULT NULL,
  `empresa` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evento`
--

LOCK TABLES `evento` WRITE;
/*!40000 ALTER TABLE `evento` DISABLE KEYS */;
INSERT INTO `evento` VALUES
(6,'Recolecta para niños','/fotos_eventos/Recolecta para niños.jpg','empresas'),
(7,'evento2','/fotos_eventos/evento2.jpg','superinten');
/*!40000 ALTER TABLE `evento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participantes`
--

DROP TABLE IF EXISTS `participantes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `participantes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `cargo` varchar(100) DEFAULT NULL,
  `foto` varchar(100) DEFAULT NULL,
  `evento_id` int(11) DEFAULT NULL,
  `cedula` varchar(50) DEFAULT NULL,
  `participara` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cedula` (`cedula`),
  KEY `evento_id` (`evento_id`),
  CONSTRAINT `participantes_ibfk_1` FOREIGN KEY (`evento_id`) REFERENCES `evento` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participantes`
--

LOCK TABLES `participantes` WRITE;
/*!40000 ALTER TABLE `participantes` DISABLE KEYS */;
INSERT INTO `participantes` VALUES
(66,'Francisco','hola@hotmail.com','Operario','/fotos_participantes/Francisco.jpg',6,'111939',1),
(67,'Orlando','hola@hotmail.com','Operario','/fotos_participantes/Orlando.jpg',6,'123445',1),
(68,'Mauricio','hola@hotmail.com','Operario','/fotos_participantes/Mauricio.jpg',6,'223344',1),
(69,'Sebastian','hola@hotmail.com','Operario','/fotos_participantes/Sebastian.jpg',6,'1223344',1),
(70,'Pedro','hola@hotmail.com','Operario','/fotos_participantes/Pedro.jpg',6,'121231231',1),
(71,'Jefferson','hola@hotmail.com','Operario','/fotos_participantes/Jefferson.jpg',6,'12313124',1),
(72,'Hellena','hola@hotmail.com','Operario','/fotos_participantes/Hellena.jpg',6,'12412415',1),
(73,'Heidy','hola@hotmail.com','Operario','/fotos_participantes/Heidy.jpg',6,'121',1),
(74,'Sophia','hola@hotmail.com','Operario','/user.png',6,'2222',0),
(75,'Sara','hola@hotmail.com','Operario','/user.png',6,'22222222',0);
/*!40000 ALTER TABLE `participantes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sorteos`
--

DROP TABLE IF EXISTS `sorteos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sorteos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `evento_id` int(11) NOT NULL,
  `ganador_id` int(11) DEFAULT NULL,
  `jugado` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `evento_id` (`evento_id`),
  KEY `fk_ganador` (`ganador_id`),
  CONSTRAINT `fk_ganador` FOREIGN KEY (`ganador_id`) REFERENCES `participantes` (`id`),
  CONSTRAINT `sorteos_ibfk_1` FOREIGN KEY (`evento_id`) REFERENCES `evento` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sorteos`
--

LOCK TABLES `sorteos` WRITE;
/*!40000 ALTER TABLE `sorteos` DISABLE KEYS */;
INSERT INTO `sorteos` VALUES
(9,'sorteo',6,69,1),
(10,'sorteo2',6,66,1),
(11,'mmmmm',6,NULL,0);
/*!40000 ALTER TABLE `sorteos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-03 11:08:27
