CREATE DATABASE  IF NOT EXISTS `allclean` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `allclean`;
-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: allclean
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `avatares`
--

DROP TABLE IF EXISTS `avatares`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avatares` (
  `AvatarID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) NOT NULL,
  PRIMARY KEY (`AvatarID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avatares`
--

LOCK TABLES `avatares` WRITE;
/*!40000 ALTER TABLE `avatares` DISABLE KEYS */;
INSERT  IGNORE INTO `avatares` VALUES (1,'Avatar-1643233410498.png');
/*!40000 ALTER TABLE `avatares` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carritos`
--

DROP TABLE IF EXISTS `carritos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carritos` (
  `CartID` int NOT NULL AUTO_INCREMENT,
  `Quantity` int NOT NULL,
  `ProductID` int NOT NULL,
  `UserID` int NOT NULL,
  PRIMARY KEY (`CartID`),
  KEY `UserID_Cart_idx` (`UserID`),
  KEY `ProductID_Cart_idx` (`ProductID`),
  CONSTRAINT `ProductID_Cart` FOREIGN KEY (`ProductID`) REFERENCES `productos` (`ProductID`),
  CONSTRAINT `UserID_Cart` FOREIGN KEY (`UserID`) REFERENCES `usuarios` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carritos`
--

LOCK TABLES `carritos` WRITE;
/*!40000 ALTER TABLE `carritos` DISABLE KEYS */;
/*!40000 ALTER TABLE `carritos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `CategoryID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(80) NOT NULL,
  `Icon` varchar(200) NOT NULL,
  `IsPopular` tinyint DEFAULT NULL,
  PRIMARY KEY (`CategoryID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT  IGNORE INTO `categorias` VALUES (3,'Limpieza de Cocina','fas fa-sink index-categories-icons',1),(4,'Limpieza de Baño','fas fa-toilet index-categories-icons',1),(5,'Desinfectantes','fas fa-pump-medical index-categories-icons',1),(6,'Accesorios limpieza','fas fa-pump-soap index-categories-icons',NULL),(7,'Limpieza piso y muebles','fas fa-broom index-categories-icons',NULL),(8,'Otros','fas fa-vial index-categories-icons',NULL);
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `domicilios`
--

DROP TABLE IF EXISTS `domicilios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `domicilios` (
  `HomeID` int NOT NULL AUTO_INCREMENT,
  `Street` varchar(45) NOT NULL,
  `ZipCode` int NOT NULL,
  `City` varchar(45) NOT NULL,
  `Town` varchar(45) NOT NULL,
  `ExtraIndications` varchar(200) DEFAULT NULL,
  `UserID` int NOT NULL,
  PRIMARY KEY (`HomeID`),
  KEY `UserID_Home_idx` (`UserID`),
  CONSTRAINT `UserID_Home` FOREIGN KEY (`UserID`) REFERENCES `usuarios` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `domicilios`
--

LOCK TABLES `domicilios` WRITE;
/*!40000 ALTER TABLE `domicilios` DISABLE KEYS */;
/*!40000 ALTER TABLE `domicilios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagenes`
--

DROP TABLE IF EXISTS `imagenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagenes` (
  `ImageID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(200) NOT NULL,
  `ProductID` int NOT NULL,
  PRIMARY KEY (`ImageID`),
  KEY `ProductID_Image_idx` (`ProductID`),
  CONSTRAINT `ProductID_Image` FOREIGN KEY (`ProductID`) REFERENCES `productos` (`ProductID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagenes`
--

LOCK TABLES `imagenes` WRITE;
/*!40000 ALTER TABLE `imagenes` DISABLE KEYS */;
INSERT  IGNORE INTO `imagenes` VALUES (1,'cocina1.webp',2),(2,'desinfect1.webp',3),(3,'otros5.webp',4),(4,'otros1.webp',5),(5,'cocina5.webp',6),(6,'banio1.webp',7),(7,'banio2.webp',8),(8,'banio3.webp',9),(9,'banio4.webp',10),(10,'banio5.webp',11);
/*!40000 ALTER TABLE `imagenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `metodos_pago`
--

DROP TABLE IF EXISTS `metodos_pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `metodos_pago` (
  `PaymentMethodID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) NOT NULL,
  `OrderID` int NOT NULL,
  PRIMARY KEY (`PaymentMethodID`),
  KEY `OrderID_PaymentMethod_idx` (`OrderID`),
  CONSTRAINT `OrderID_PaymentMethod` FOREIGN KEY (`OrderID`) REFERENCES `ordenes` (`OrderID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metodos_pago`
--

LOCK TABLES `metodos_pago` WRITE;
/*!40000 ALTER TABLE `metodos_pago` DISABLE KEYS */;
/*!40000 ALTER TABLE `metodos_pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ordenes`
--

DROP TABLE IF EXISTS `ordenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ordenes` (
  `OrderID` int NOT NULL AUTO_INCREMENT,
  `Total` decimal(10,2) NOT NULL,
  `HomeID` int NOT NULL,
  `UserID` int NOT NULL,
  PRIMARY KEY (`OrderID`),
  KEY `UserID_Order_idx` (`UserID`),
  KEY `HomeID_Order_idx` (`HomeID`),
  CONSTRAINT `HomeID_Order` FOREIGN KEY (`HomeID`) REFERENCES `domicilios` (`HomeID`),
  CONSTRAINT `UserID_Order` FOREIGN KEY (`UserID`) REFERENCES `usuarios` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ordenes`
--

LOCK TABLES `ordenes` WRITE;
/*!40000 ALTER TABLE `ordenes` DISABLE KEYS */;
/*!40000 ALTER TABLE `ordenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ordenes_detalle`
--

DROP TABLE IF EXISTS `ordenes_detalle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ordenes_detalle` (
  `OrderDetailID` int NOT NULL AUTO_INCREMENT,
  `Price` decimal(10,2) NOT NULL,
  `Quantity` int NOT NULL,
  `OrderDate` date NOT NULL,
  `ProductID` int NOT NULL,
  `OrderID` int NOT NULL,
  PRIMARY KEY (`OrderDetailID`),
  KEY `ProductID_OrderDetail_idx` (`ProductID`),
  KEY `OrderID_OrderDetail_idx` (`OrderID`),
  CONSTRAINT `OrderID_OrderDetail` FOREIGN KEY (`OrderID`) REFERENCES `ordenes` (`OrderID`),
  CONSTRAINT `ProductID_OrderDetail` FOREIGN KEY (`ProductID`) REFERENCES `productos` (`ProductID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ordenes_detalle`
--

LOCK TABLES `ordenes_detalle` WRITE;
/*!40000 ALTER TABLE `ordenes_detalle` DISABLE KEYS */;
/*!40000 ALTER TABLE `ordenes_detalle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `ProductID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) NOT NULL,
  `Description` varchar(45) NOT NULL,
  `Price` decimal(10,2) NOT NULL,
  `IsOffer` tinyint DEFAULT NULL,
  `Discount` decimal(10,2) DEFAULT NULL,
  `Quantity` int NOT NULL,
  `UserID` int NOT NULL,
  `CategoryID` int NOT NULL,
  PRIMARY KEY (`ProductID`),
  KEY `UserID_Product_idx` (`UserID`),
  KEY `CategoryID_Product_idx` (`CategoryID`),
  CONSTRAINT `CategoryID_Product` FOREIGN KEY (`CategoryID`) REFERENCES `categorias` (`CategoryID`),
  CONSTRAINT `UserID_Product` FOREIGN KEY (`UserID`) REFERENCES `usuarios` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT  IGNORE INTO `productos` VALUES (2,'Aerosol 250 ml','Incision of prostate',18910.00,1,12.00,50,3,7),(3,'Alcohol en Spray 1 litro','Endo emb hd/nk,bare coil',33296.00,1,0.00,50,1,6),(4,'Lavandina 250 ml','Bladder diagnos proc NEC',43210.00,0,10.00,50,6,4),(5,'Detergente 500 ml','Bact smear-ent/larynx',89548.00,0,3.00,50,1,7),(6,'Lavandina 500 ml','Insert oropharyn airway',54409.00,1,16.00,50,7,3),(7,'Suavizante 5 litros','Tetanus antitoxin admini',1289.00,0,43.00,50,5,6),(8,'Quitamanchas 250 ml','Bilateral adrenalectomy',22734.00,0,49.00,50,7,4),(9,'Jabon en Polvo 250 gr','Orthoptic training',44691.00,1,4.00,50,4,5),(10,'Quitamanchas 5 litros','Cul-de-sac operation NEC',34943.00,1,22.00,50,5,6),(11,'Jabon Líquido 3 kg','Arth/pros rem wo rep-hnd',37807.00,1,46.00,50,3,3);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_usuarios`
--

DROP TABLE IF EXISTS `tipo_usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_usuarios` (
  `UserTypeID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) NOT NULL,
  PRIMARY KEY (`UserTypeID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_usuarios`
--

LOCK TABLES `tipo_usuarios` WRITE;
/*!40000 ALTER TABLE `tipo_usuarios` DISABLE KEYS */;
INSERT  IGNORE INTO `tipo_usuarios` VALUES (1,'client'),(2,'admin');
/*!40000 ALTER TABLE `tipo_usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `UserID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) NOT NULL,
  `LastName` varchar(45) NOT NULL,
  `UserName` varchar(45) NOT NULL,
  `BirthDate` date DEFAULT NULL,
  `Password` varchar(200) NOT NULL,
  `Email` varchar(45) NOT NULL,
  `AvatarID` int NOT NULL,
  `UserTypeID` int NOT NULL,
  PRIMARY KEY (`UserID`),
  KEY `UserTypeID_User_idx` (`UserTypeID`),
  KEY `AvatarID_User_idx` (`AvatarID`),
  CONSTRAINT `AvatarID_User` FOREIGN KEY (`AvatarID`) REFERENCES `avatares` (`AvatarID`),
  CONSTRAINT `UserTypeID_User` FOREIGN KEY (`UserTypeID`) REFERENCES `tipo_usuarios` (`UserTypeID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT  IGNORE INTO `usuarios` VALUES (1,'Jordon','Kiely','jkiely0','2021-08-06','$2b$10$DWFOBjuOFI9mdHOnzSz6MOaMdg.7UmEpNh29Xw.EttPtl3cvC/Gie','jkiely0@latimes.com',1,1),(2,'Port','Ubanks','pubanks1','2021-09-27','secret','pubanks1@sciencedirect.com',1,2),(3,'Whitman','Brittoner','wbrittoner2','2021-07-10','secret','wbrittoner2@phoca.cz',1,1),(4,'Tarra','Wonfar','twonfar3','2021-07-06','secret','twonfar3@networksolutions.com',1,2),(5,'Lenette','Georgius','lgeorgius4','2021-12-07','secret','lgeorgius4@1688.com',1,1),(6,'Reginauld','Mungham','rmungham5','2021-10-19','secret','rmungham5@dyndns.org',1,2),(7,'Francisco','Cruz','fcruz6','2021-07-24','secret','fcruz6@addtoany.com',1,1),(8,'Berty','MacGlory','bmacglory7','2020-12-31','secret','bmacglory7@angelfire.com',1,2);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-30 19:01:03
