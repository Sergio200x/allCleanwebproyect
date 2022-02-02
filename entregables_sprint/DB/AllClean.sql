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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-31 19:04:23
