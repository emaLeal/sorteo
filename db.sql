-- MariaDB dump 10.19-11.0.2-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: sorteo
-- ------------------------------------------------------
-- Server version	11.0.2-MariaDB

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES
(2,'lealemanuel31@protonmail.com','admin','1234');
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
  `nombre_evento` varchar(255) DEFAULT NULL,
  `foto_evento` varchar(255) DEFAULT NULL,
  `empresa` varchar(255) DEFAULT NULL,
  `foto_empresa` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evento`
--

LOCK TABLES `evento` WRITE;
/*!40000 ALTER TABLE `evento` DISABLE KEYS */;
INSERT INTO `evento` VALUES
(14,'evento','/fotos_eventos/evento1691080111397.jpg','empresa','/fotos_empresas/empresa1691080111411.png'),
(15,'nuevo evento','/fotos_eventos/nuevo evento1691683585569.jpg','empresa 2','/fotos_empresas/empresa 21691683585571.png');
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
) ENGINE=InnoDB AUTO_INCREMENT=892 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participantes`
--

LOCK TABLES `participantes` WRITE;
/*!40000 ALTER TABLE `participantes` DISABLE KEYS */;
INSERT INTO `participantes` VALUES
(884,'Emanuel','operario','prueba@gmail.com','/user.png',14,'1223',1),
(885,'Benjamin','operario','prueba@gmail.com','/user.png',14,'1243',1),
(886,'Milena','operario','prueba@gmail.com','/user.png',14,'1222',1),
(887,'Sofia','operario','prueba@gmail.com','/fotos_participantes/Sofia.jpg',14,'11111',1),
(888,'Gabriela','operario','prueba@gmail.com','/user.png',14,'15552',1),
(889,'Daniela','operario','prueba@gmail.com','/user.png',14,'1241421',1),
(890,'Karen','operario','prueba@gmail.com','/user.png',14,'1251',0),
(891,'Pedro','operario','prueba@gmail.com','/user.png',14,'12512551',0);
/*!40000 ALTER TABLE `participantes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `preguntas`
--

DROP TABLE IF EXISTS `preguntas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `preguntas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sorteo_id` int(11) NOT NULL,
  `pregunta` varchar(255) NOT NULL,
  `opcion1` varchar(255) NOT NULL,
  `opcion2` varchar(255) NOT NULL,
  `opcion3` varchar(255) NOT NULL,
  `opcion4` varchar(255) NOT NULL,
  `opcion_verdadera` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sorteo_id` (`sorteo_id`),
  CONSTRAINT `preguntas_ibfk_1` FOREIGN KEY (`sorteo_id`) REFERENCES `sorteos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `preguntas`
--

LOCK TABLES `preguntas` WRITE;
/*!40000 ALTER TABLE `preguntas` DISABLE KEYS */;
INSERT INTO `preguntas` VALUES
(1,17,'cual es mi edad','28','19','21','23',2),
(2,18,'Cual es la capital de colombia','Cali','Medellin','Cucuta','Bogota',4),
(3,19,'Que animal es Hervivoro','Hiena','Leon','Alce','Cocodrilo',3),
(4,20,'Como se llama el barco de Jack Sparrow','El Blue Falcon','El perla negra','El Oro Jackson','El holandes Errante',2),
(5,21,'En que año salio spiderman 1 de Sam Reimi','2002','2010','2000','1998',1);
/*!40000 ALTER TABLE `preguntas` ENABLE KEYS */;
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
  `jugado` tinyint(1) DEFAULT NULL,
  `premio` varchar(100) DEFAULT NULL,
  `premio_foto` varchar(100) DEFAULT NULL,
  `ganador_id` int(11) DEFAULT NULL,
  `evento_id` int(11) DEFAULT NULL,
  `nombre_ganador` varchar(100) DEFAULT NULL,
  `pregunta` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `evento_id` (`evento_id`),
  KEY `ganador_id` (`ganador_id`),
  CONSTRAINT `sorteos_ibfk_1` FOREIGN KEY (`evento_id`) REFERENCES `evento` (`id`) ON DELETE CASCADE,
  CONSTRAINT `sorteos_ibfk_2` FOREIGN KEY (`ganador_id`) REFERENCES `participantes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sorteos`
--

LOCK TABLES `sorteos` WRITE;
/*!40000 ALTER TABLE `sorteos` DISABLE KEYS */;
INSERT INTO `sorteos` VALUES
(17,'sorteo',1,'premio','/fotos_sorteos/sorteo.jpg',886,14,'Milena',1),
(18,'sorteo',1,'premio','/fotos_sorteos/sorteo.jpg',884,14,'Emanuel',1),
(19,'sorteo nuevo',1,'Premio nuevo','/fotos_sorteos/sorteo nuevo.jpg',885,14,'Benjamin',1),
(20,'otro sorteo',1,'otro premio','/fotos_sorteos/otro sorteo.jpg',887,14,'Sofia',1),
(21,'sorteo definitivo',0,'premio del sorteo','/fotos_sorteos/sorteo definitivo.jpg',NULL,14,NULL,1);
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

-- Dump completed on 2023-08-10 17:46:27
