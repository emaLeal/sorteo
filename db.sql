-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: sorteo
-- ------------------------------------------------------
-- Server version	8.0.38

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
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
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `correo` varchar(80) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `usuario` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contrasena` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (2,'lealemanuel31@protonmail.com','admin','1234');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evento`
--

DROP TABLE IF EXISTS `evento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre_evento` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `foto_evento` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `empresa` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `foto_empresa` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evento`
--

LOCK TABLES `evento` WRITE;
/*!40000 ALTER TABLE `evento` DISABLE KEYS */;
INSERT INTO `evento` VALUES (17,'EVENTO DE PRUEBA','/fotos_eventos/EVENTO DE PRUEBA1721835701240.jpg','EMPRESA DE PRUEBA','/fotos_empresas/EMPRESA DE PRUEBA1721835701251.jpg');
/*!40000 ALTER TABLE `evento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exclusividad_sorteo`
--

DROP TABLE IF EXISTS `exclusividad_sorteo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exclusividad_sorteo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sorteo_id` int DEFAULT NULL,
  `participante_id` int DEFAULT NULL,
  `habilitado` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `sorteo_id` (`sorteo_id`),
  KEY `participante_id` (`participante_id`),
  CONSTRAINT `exclusividad_sorteo_ibfk_1` FOREIGN KEY (`sorteo_id`) REFERENCES `sorteos` (`id`),
  CONSTRAINT `exclusividad_sorteo_ibfk_2` FOREIGN KEY (`participante_id`) REFERENCES `participantes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exclusividad_sorteo`
--

LOCK TABLES `exclusividad_sorteo` WRITE;
/*!40000 ALTER TABLE `exclusividad_sorteo` DISABLE KEYS */;
INSERT INTO `exclusividad_sorteo` VALUES (25,24,902,1),(27,24,906,1);
/*!40000 ALTER TABLE `exclusividad_sorteo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historial`
--

DROP TABLE IF EXISTS `historial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historial` (
  `id` int NOT NULL AUTO_INCREMENT,
  `evento_id` int NOT NULL,
  `sorteo_id` int DEFAULT NULL,
  `participante_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `evento_id` (`evento_id`),
  KEY `sorteo_id` (`sorteo_id`),
  KEY `participante_id` (`participante_id`),
  CONSTRAINT `historial_ibfk_1` FOREIGN KEY (`evento_id`) REFERENCES `evento` (`id`),
  CONSTRAINT `historial_ibfk_2` FOREIGN KEY (`sorteo_id`) REFERENCES `sorteos` (`id`),
  CONSTRAINT `historial_ibfk_3` FOREIGN KEY (`participante_id`) REFERENCES `participantes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historial`
--

LOCK TABLES `historial` WRITE;
/*!40000 ALTER TABLE `historial` DISABLE KEYS */;
/*!40000 ALTER TABLE `historial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participantes`
--

DROP TABLE IF EXISTS `participantes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `participantes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cargo` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `correo` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `foto` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `evento_id` int NOT NULL,
  `cedula` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `participara` tinyint(1) DEFAULT NULL,
  `acepta` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `cedula` (`cedula`),
  KEY `fk_evento_id` (`evento_id`),
  CONSTRAINT `fk_evento_id` FOREIGN KEY (`evento_id`) REFERENCES `evento` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=908 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participantes`
--

LOCK TABLES `participantes` WRITE;
/*!40000 ALTER TABLE `participantes` DISABLE KEYS */;
INSERT INTO `participantes` VALUES (902,'Emanuel Leal','Cargo','leal@gmail.com','/user.png',17,'1110283134',0,0),(906,'Nombre','Cargo','Correo@gmail.com','/user.png',17,'11182882',0,0),(907,'Karen Daniela','Cargo','kare@gmail.com','/user.png',17,'1231323131231',1,0);
/*!40000 ALTER TABLE `participantes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `preguntas`
--

DROP TABLE IF EXISTS `preguntas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `preguntas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sorteo_id` int NOT NULL,
  `pregunta` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `opcion1` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `opcion2` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `opcion3` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `opcion4` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `opcion_verdadera` int NOT NULL,
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
/*!40000 ALTER TABLE `preguntas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sorteos`
--

DROP TABLE IF EXISTS `sorteos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sorteos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jugado` tinyint(1) DEFAULT NULL,
  `premio` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `premio_foto` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ganador_id` int DEFAULT NULL,
  `evento_id` int DEFAULT NULL,
  `nombre_ganador` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pregunta` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `evento_id` (`evento_id`),
  KEY `ganador_id` (`ganador_id`),
  CONSTRAINT `sorteos_ibfk_1` FOREIGN KEY (`evento_id`) REFERENCES `evento` (`id`) ON DELETE CASCADE,
  CONSTRAINT `sorteos_ibfk_2` FOREIGN KEY (`ganador_id`) REFERENCES `participantes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sorteos`
--

LOCK TABLES `sorteos` WRITE;
/*!40000 ALTER TABLE `sorteos` DISABLE KEYS */;
INSERT INTO `sorteos` VALUES (24,'sorteo 1',0,'premio 1','/fotos_sorteos/sorteo 1.png',NULL,17,NULL,0);
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

-- Dump completed on 2024-08-06 14:34:37
