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
-- Dumping data for table `avatares`
--

LOCK TABLES `avatares` WRITE;
/*!40000 ALTER TABLE `avatares` DISABLE KEYS */;
INSERT INTO `avatares` VALUES (1,'sr-x.jpg');
/*!40000 ALTER TABLE `avatares` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `carritos`
--

LOCK TABLES `carritos` WRITE;
/*!40000 ALTER TABLE `carritos` DISABLE KEYS */;
/*!40000 ALTER TABLE `carritos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Limpieza de Cocina','fasfa-sink index-categories-icons',1),(2,'Limpieza de Baño','fasfa-toilet index-categories-icons',1),(3,'Desinfectantes','fasfa-pump-medical index-categories-icons',1),(4,'Accesorios limpieza','fasfa-pump-soap index-categories-icons',NULL),(5,'Limpieza piso y muebles','fasfa-broom index-categories-icons',NULL),(6,'Otros','fasfa-vial index-categories-icons',NULL);
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `domicilios`
--

LOCK TABLES `domicilios` WRITE;
/*!40000 ALTER TABLE `domicilios` DISABLE KEYS */;
/*!40000 ALTER TABLE `domicilios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `imagenes`
--

LOCK TABLES `imagenes` WRITE;
/*!40000 ALTER TABLE `imagenes` DISABLE KEYS */;
INSERT INTO `imagenes` VALUES (1,'cocina1.webp',1),(2,'cocina15.webp',2),(3,'desinfect1.webp',3),(4,'otros5.webp',4),(5,'otros1.webp',5),(6,'cocina5.webp',6),(7,'banio1.webp',7),(8,'banio2.webp',8),(9,'banio3.webp',9),(10,'banio4.webp',10),(11,'banio5.webp',11),(12,'banio6.webp',12),(13,'banio7.webp',13),(14,'banio8.webp',14),(15,'banio9.webp',15),(16,'cocina2.webp',16),(17,'cocina3.webp',17),(18,'cocina4.webp',18),(19,'cocina6.webp',19),(20,'cocina7.webp',20),(21,'cocina8.webp',21),(22,'cocina9.webp',22),(23,'cocina10.webp',23),(24,'cocina11.webp',24),(25,'pisosymuebles1.webp',25),(26,'pisosymuebles2.JPG',26),(27,'pisosymuebles3.webp',27),(28,'pisosymuebles4.webp',28),(29,'pisosymuebles5.webp',29),(30,'otros.webp',30),(31,'otros2.webp',31),(32,'otros3.webp',32),(33,'otros4.webp',33),(34,'otros6.webp',34),(35,'otros7.webp',35),(36,'otros8.webp',36),(37,'otros9.webp',37),(38,'cocina12.webp',38),(39,'desinfect2.webp',39),(40,'desinfect3.webp',40),(41,'otros2.webp',41),(42,'otros3.webp',42),(43,'otros4.webp',43),(44,'otros6.webp',44),(45,'otros7.webp',45),(46,'otros8.webp',46),(47,'otros9.webp',47),(48,'cocina12.webp',48),(49,'desinfect2.webp',49);
/*!40000 ALTER TABLE `imagenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `metodos_pago`
--

LOCK TABLES `metodos_pago` WRITE;
/*!40000 ALTER TABLE `metodos_pago` DISABLE KEYS */;
/*!40000 ALTER TABLE `metodos_pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `ordenes`
--

LOCK TABLES `ordenes` WRITE;
/*!40000 ALTER TABLE `ordenes` DISABLE KEYS */;
/*!40000 ALTER TABLE `ordenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `ordenes_detalle`
--

LOCK TABLES `ordenes_detalle` WRITE;
/*!40000 ALTER TABLE `ordenes_detalle` DISABLE KEYS */;
/*!40000 ALTER TABLE `ordenes_detalle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Quitamanchas 1kg','Sun Polvo deja tu vajilla impecable inclu',340.21,1,3.00,50,2,3),(2,'Lisoform desinfectante','Lysoform Aerosol Desinfectante es un aero',310.53,0,38.00,50,4,2),(3,'Suavizante 900ml','Suavizante para ropa Vivere Escudo Protec',398.60,0,38.00,50,3,2),(4,'Cepillo inodoro','Cepillo Para Inodoro Great Value',414.50,0,19.00,50,1,6),(5,'Limpiador cremoso','Limpiador cremoso el coloso',491.29,0,10.00,50,2,1),(6,'Limpiador Líquido Cif Baño 450 ml','El limpiador líquido CIF Baño Biodegradab',480.31,1,57.00,50,2,2),(7,'Gel Limpia Inodoro Harpic','Gel limpia inodoros. Desinfectante. Efica',357.69,1,18.00,50,1,3),(8,'Canasta Para Inodoro Glade Lavanda','Canasta Sólida Para Inodoro Glade Lavanda',498.28,0,20.00,50,3,2),(9,'Cif Antibacterial 500 Ml','Cif 2 en 1 Limpiador Líquido Gatillo Anti',491.58,1,29.00,50,3,4),(10,'Limpiador De Baño Ayudín 900ml','Limpiador De Baño Ayudín Limpieza Activa',499.55,1,32.00,50,4,5),(11,'Adhesivo Para Inodoro Glade 8.2gr','Limpiador Adhesivo Para Inodoro Glade Cam',332.83,1,27.00,50,4,6),(12,'Pastilla Para Inodoro Glade 25gr','Pastilla Para Inodoro Glade Mañana De Cam',361.10,0,33.00,50,2,2),(13,'Canasta Lysoform Cítrica 38.6gr','Lysoform Fresh Canasta Sólida es una cana',434.36,0,0.00,50,3,4),(14,'Discos Adhesivos Pato 38gr','El aparato contiene el mango y 6 discos d',411.02,1,33.00,50,4,3),(15,'Cif Antigrasa 450 Ml','Limpiador Líquido CIF Antigrasa Biodegrad',414.08,0,50.00,50,3,1),(16,'Odex Gel Ultra Blanco 500 Ml','Odex Gel Limpiador Ultra Blanco es un lim',320.16,0,54.00,50,1,5),(17,'Odex Cremoso Limon 500 Ml','Odex Limpiador Cremoso Limon es un limpia',358.03,1,41.00,50,2,4),(18,'Detergente Limon El coloso 500 ml','El coloso evoluciono y trae su mejor fórm',381.92,1,42.00,50,3,4),(19,'Detergente Original El coloso 500 ml','El coloso evoluciono y trae su mejor fórm',442.62,1,24.00,50,4,3),(20,'Mr. Músculo Líquido Antigrasa 450ml','Limpiador De Cocina Mr. Músculo Líquido A',322.70,0,26.00,50,1,5),(21,'Quitamanchas 1kg','Sun Polvo deja tu vajilla impecable inclu',477.82,0,11.00,50,2,5),(22,'30 tabletas lavavajillas Sun','Sun Polvo deja tu vajilla impecable inclu',432.82,1,8.00,50,2,6),(23,'Detergente Zorro Limón 750 Ml','El detergente  remueve la grasa y sucieda',422.75,1,40.00,50,4,4),(24,'Lustramuebles Cif 400 Ml','CIF presenta el Lustamuebles Cif Ultra Br',424.61,0,19.00,50,4,3),(25,'Cif Ultra Brillo Recarga 380 Ml','CIF presenta el Lustamuebles Cif Ultra Br',473.69,0,26.00,50,3,5),(26,'Limpiador Pisos Procenex 1.8L','Procenex Lavanda es un líquido concentrad',318.55,0,16.00,50,4,1),(27,'Limpiador De Pisos Poett 4L','Limpiador Desinfectante De Pisos Poett Fl',449.33,0,21.00,50,1,4),(28,'Limpiador De Pisos Poett 4L','Limpiador Desinfectante De Pisos Poett La',427.20,1,24.00,50,4,5),(29,'Suavizante Vivere 3L','Suavizante para ropa Vivere Escudo Protec',413.33,0,53.00,50,3,1),(30,'Separadores Freezer 100 U','Separadores P/Freezer Great Value 100 U',471.40,0,11.00,50,1,2),(31,'Abrillantador Glow 500ml','Abrillantador Glow 500ml',424.37,0,32.00,50,3,4),(32,'Jabon Liquido Ala 3 litros','El Lavado Perfecto con Ala es posible',494.15,1,22.00,50,4,3),(33,'Bolsa Basura Rollo Task 20U','Bolsa Basura Rollo Bio 45x60 Task 20 Un',306.34,0,33.00,50,2,1),(34,'Virulana 10 U','Esponja Rollo De Acero Virulana 10 U',465.91,1,38.00,50,1,1),(35,'Trapo Piso Gris Great Value','Trapo Piso Gris Great Value 60 X 65 Cm',421.09,0,29.00,50,1,4),(36,'Guante L Mapa 1U','Guante Plisse Satinado L Mapa 1 U',397.03,0,12.00,50,3,4),(37,'Detergente Magistral 750 Ml','Probá el nuevo detergente líquido Magistr',360.81,0,30.00,50,1,5),(38,'Desinfectante Ayudin 332 Ml','Aerosol Desinfectante Ayudin Expert Bebé',463.11,0,17.00,50,4,2),(39,'Automático Lysoform Completo','Lysoform Automatico Full Aire de Montaña',437.24,0,47.00,50,4,3),(40,'Separadores Freezer 100 U','Separadores P/Freezer Great Value 100 U',327.88,1,39.00,50,1,1),(41,'Abrillantador Glow 500ml','Abrillantador Glow 500ml',313.15,0,36.00,50,4,5),(42,'Jabon Liquido Ala 3 litros','El Lavado Perfecto con Ala es posible',410.78,1,13.00,50,2,6),(43,'Bolsa Basura Rollo Task 20U','Bolsa Basura Rollo Bio 45x60 Task 20 Un',428.66,0,25.00,50,3,2),(44,'Virulana 10 U','Esponja Rollo De Acero Virulana 10 U',496.32,1,19.00,50,1,4),(45,'Trapo Piso Gris Great Value','Trapo Piso Gris Great Value 60 X 65 Cm',486.11,1,4.00,50,4,6),(46,'Guante L Mapa 1U','Guante Plisse Satinado L Mapa 1 U',398.72,1,59.00,50,4,6),(47,'Detergente Magistral 750 Ml','Probá el nuevo detergente líquido Magistr',307.15,0,54.00,50,1,5),(48,'Desinfectante Ayudin 332 Ml','Aerosol Desinfectante Ayudin Expert Bebé',447.17,1,2.00,50,2,2),(49,'Desinfectante Ayudin 500 Ml','Aerosol Desinfectante Ayudin',478.00,1,41.00,50,2,4);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tipo_usuarios`
--

LOCK TABLES `tipo_usuarios` WRITE;
/*!40000 ALTER TABLE `tipo_usuarios` DISABLE KEYS */;
INSERT INTO `tipo_usuarios` VALUES (1,'client'),(2,'admin');
/*!40000 ALTER TABLE `tipo_usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Diego','Marco','DiegoAC','2021-11-05','$2b$10$DWFOBjuOFI9mdHOnzSz6MOaMdg.7UmEpNh29Xw.EttPtl3cvC/Gie','diego@allclean.com',1,2),(2,'Sergio','Fernandez','SergioAC','2021-08-12','$2b$10$DWFOBjuOFI9mdHOnzSz6MOaMdg.7UmEpNh29Xw.EttPtl3cvC/Gie','segio@allclean.com',1,2),(3,'Javier','Marillan','JavierAC','2021-09-03','$2b$10$DWFOBjuOFI9mdHOnzSz6MOaMdg.7UmEpNh29Xw.EttPtl3cvC/Gie','javier@allclean.com',1,2),(4,'Martina','Agüero','MartinaAC','2021-08-24','$2b$10$DWFOBjuOFI9mdHOnzSz6MOaMdg.7UmEpNh29Xw.EttPtl3cvC/Gie','martina@allclean.com',1,2);
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

-- Dump completed on 2022-02-02 21:36:41
