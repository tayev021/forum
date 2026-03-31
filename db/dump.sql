-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: forum
-- ------------------------------------------------------
-- Server version	8.0.43

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
-- Table structure for table `attachments`
--

DROP TABLE IF EXISTS `attachments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attachments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `postId` int NOT NULL,
  `type` enum('image') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `fileName` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `postId` (`postId`),
  CONSTRAINT `attachments_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attachments`
--

LOCK TABLES `attachments` WRITE;
/*!40000 ALTER TABLE `attachments` DISABLE KEYS */;
INSERT INTO `attachments` VALUES (63,192,'image','2026-02-17 10:07:46','2026-02-17 10:07:46','image-bbb5a8ae-1cf6-4df9-b088-8e84284104fc.jpeg'),(64,192,'image','2026-02-17 10:07:46','2026-02-17 10:07:46','image-e4e357b2-dfa9-4007-9633-c2875cdc3232.jpeg'),(65,192,'image','2026-02-17 10:07:46','2026-02-17 10:07:46','image-6c52dea6-91c5-4e6f-b2fa-9940d878734f.jpeg'),(66,192,'image','2026-02-17 10:07:46','2026-02-17 10:07:46','image-a7c5468a-7539-49d0-bdbb-80bf164da81c.jpeg'),(67,192,'image','2026-02-17 10:07:46','2026-02-17 10:07:46','image-5346d48c-a6b5-4da6-8083-6d88681bfdea.jpeg'),(68,192,'image','2026-02-17 10:07:46','2026-02-17 10:07:46','image-4bfe353b-6bbb-461c-96f1-0c85debe4dc9.jpeg'),(69,192,'image','2026-02-17 10:07:46','2026-02-17 10:07:46','image-db182318-b179-4c05-a45d-096aec7c020b.jpeg'),(70,192,'image','2026-02-17 10:07:46','2026-02-17 10:07:46','image-83c67674-6b0f-4100-9fe0-20f6a6e0068a.jpeg'),(71,219,'image','2026-02-19 19:48:19','2026-02-19 19:48:19','image-5c91b932-2765-4cf3-b92b-655ed9fb0651.jpeg'),(74,219,'image','2026-02-19 19:55:36','2026-02-19 19:55:36','image-d52b3cae-81f9-43a0-865a-03364a27499e.jpeg'),(75,219,'image','2026-02-19 19:55:36','2026-02-19 19:55:36','image-37f3af5a-5450-49d6-a7e2-70cfffca7e6c.jpeg'),(76,219,'image','2026-02-19 19:55:36','2026-02-19 19:55:36','image-39345b8d-7875-45a6-80d8-0bf813140a93.jpeg');
/*!40000 ALTER TABLE `attachments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `authorId` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `authorId` (`authorId`),
  CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`authorId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,1,'General','2025-11-17 17:56:42','2025-11-17 17:56:42'),(2,1,'Movies','2025-11-17 20:21:45','2025-11-17 20:21:45'),(39,1,'Music','2026-02-19 20:51:46','2026-02-19 20:51:46');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `error-log`
--

DROP TABLE IF EXISTS `error-log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `error-log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` varchar(255) NOT NULL,
  `stack` text NOT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `error-log`
--

LOCK TABLES `error-log` WRITE;
/*!40000 ALTER TABLE `error-log` DISABLE KEYS */;
/*!40000 ALTER TABLE `error-log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forums`
--

DROP TABLE IF EXISTS `forums`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forums` (
  `id` int NOT NULL AUTO_INCREMENT,
  `authorId` int NOT NULL,
  `categoryId` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `authorId` (`authorId`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `forums_ibfk_27` FOREIGN KEY (`authorId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `forums_ibfk_28` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forums`
--

LOCK TABLES `forums` WRITE;
/*!40000 ALTER TABLE `forums` DISABLE KEYS */;
INSERT INTO `forums` VALUES (1,1,1,'News','2025-11-17 17:59:35','2025-11-17 17:59:35'),(2,1,2,'Comedy','2025-11-17 20:24:13','2025-11-17 20:24:13'),(3,1,2,'Drama','2025-11-17 20:24:37','2025-11-17 20:24:37'),(43,1,39,'New forum','2026-02-19 20:52:02','2026-02-19 20:52:02');
/*!40000 ALTER TABLE `forums` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `postId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `likes_user_id_post_id` (`userId`,`postId`),
  KEY `postId` (`postId`),
  CONSTRAINT `likes_ibfk_7` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `likes_ibfk_8` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (3,4,2,'2026-01-16 20:28:07'),(4,4,3,'2026-01-16 20:30:27'),(5,4,4,'2026-01-16 20:30:55'),(6,4,15,'2026-01-16 20:31:23'),(7,4,16,'2026-01-16 20:31:29'),(8,4,17,'2026-01-17 09:50:56'),(9,4,18,'2026-01-17 09:52:36'),(10,4,19,'2026-01-17 09:55:00'),(11,4,20,'2026-01-17 10:06:11'),(12,4,21,'2026-01-17 10:06:29'),(13,4,22,'2026-01-17 10:08:32'),(14,4,23,'2026-01-17 10:10:59'),(15,4,24,'2026-01-17 10:13:12'),(16,4,26,'2026-01-17 10:14:19'),(17,4,95,'2026-01-17 10:14:55'),(18,4,96,'2026-01-17 10:15:38'),(19,4,97,'2026-01-17 10:16:20'),(20,4,98,'2026-01-17 10:24:01'),(21,4,99,'2026-01-17 10:26:16'),(22,4,100,'2026-01-17 10:28:31'),(23,4,101,'2026-01-17 10:32:11'),(24,4,102,'2026-01-17 10:34:56'),(25,4,103,'2026-01-17 10:40:52'),(26,4,104,'2026-01-17 10:44:13'),(27,4,105,'2026-01-17 10:51:44'),(28,4,106,'2026-01-17 10:52:59'),(29,4,107,'2026-01-17 11:00:41'),(30,4,108,'2026-01-17 19:05:14'),(31,4,109,'2026-01-17 19:07:44'),(32,4,110,'2026-01-17 19:12:56'),(33,4,111,'2026-01-17 19:17:41'),(34,4,112,'2026-01-17 19:18:23'),(35,4,113,'2026-01-17 19:20:05'),(36,4,114,'2026-01-17 19:24:39'),(37,4,115,'2026-01-17 19:27:38'),(38,4,116,'2026-01-17 19:28:43'),(39,4,117,'2026-01-17 19:29:47'),(40,4,118,'2026-01-17 19:31:01'),(41,4,119,'2026-01-17 19:31:29'),(42,4,120,'2026-01-17 19:32:05'),(43,4,121,'2026-01-17 19:34:57'),(44,4,122,'2026-01-17 19:38:40'),(45,4,123,'2026-01-17 19:40:38'),(46,4,124,'2026-01-17 19:41:28'),(47,4,125,'2026-01-17 19:43:54'),(48,4,126,'2026-01-17 19:44:25'),(49,4,25,'2026-01-18 08:39:46'),(50,4,127,'2026-01-18 19:47:31'),(51,4,128,'2026-01-18 19:47:36'),(52,4,129,'2026-01-18 19:48:43'),(53,4,130,'2026-01-18 19:49:30'),(54,4,131,'2026-01-18 19:50:12'),(55,4,132,'2026-01-18 19:50:16'),(56,4,33,'2026-01-18 19:50:31'),(57,5,65,'2026-01-18 19:55:42'),(59,14,4,'2026-02-19 20:01:54'),(60,14,25,'2026-02-19 20:01:56'),(61,14,35,'2026-02-19 20:01:58');
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `authorId` int DEFAULT NULL,
  `threadId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `authorId` (`authorId`),
  KEY `threadId` (`threadId`),
  CONSTRAINT `posts_ibfk_27` FOREIGN KEY (`authorId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `posts_ibfk_28` FOREIGN KEY (`threadId`) REFERENCES `threads` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=222 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'Our forum is now available. Congratulations!','2025-11-17 18:09:30','2025-11-17 18:09:30',1,1),(2,'The Green Mile is a 1999 American fantasy drama film written and directed by Frank Darabont and based on the 1996 novel by Stephen King.','2025-11-18 10:19:54','2025-11-18 10:19:54',1,2),(3,'8/10','2025-11-24 15:36:08','2025-11-24 15:36:08',1,2),(4,'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.','2025-11-26 09:46:05','2025-11-26 09:46:05',1,3),(7,'some text','2025-11-28 09:00:31','2025-11-28 09:00:31',1,6),(8,'some text','2025-11-28 09:00:38','2025-11-28 09:00:38',1,7),(9,'some text','2025-11-28 09:00:44','2025-11-28 09:00:44',1,8),(10,'some text','2025-11-28 09:01:00','2025-11-28 09:01:00',1,9),(11,'some text','2025-11-28 09:01:03','2025-11-28 09:01:03',1,10),(12,'some text','2025-11-28 09:01:07','2025-11-28 09:01:07',1,11),(15,'some text','2025-12-02 12:35:37','2025-12-02 12:35:37',1,2),(16,'some text 2','2025-12-02 12:35:42','2025-12-02 12:35:42',1,2),(17,'some text 3','2025-12-02 12:35:47','2025-12-02 12:35:47',1,2),(18,'some text 4','2025-12-02 12:35:51','2025-12-02 12:35:51',1,2),(19,'some text 5','2025-12-02 12:35:56','2025-12-02 12:35:56',1,2),(20,'some text 6','2025-12-02 12:36:01','2025-12-02 12:36:01',1,2),(21,'some text 7','2025-12-02 12:37:03','2025-12-02 12:37:03',1,2),(22,'some text 8','2025-12-02 12:37:05','2025-12-02 12:37:05',1,2),(23,'some text 9','2025-12-02 12:37:07','2025-12-02 12:37:07',1,2),(24,'test post','2025-12-04 11:48:39','2025-12-04 11:48:39',1,2),(25,'i like it','2025-12-04 11:52:55','2025-12-04 11:52:55',1,3),(26,'test 1111111111111','2025-12-05 12:48:13','2025-12-05 12:48:13',1,2),(27,'some text 22222','2025-12-06 07:42:38','2025-12-06 07:42:38',1,14),(29,'some text 222','2025-12-06 07:50:22','2025-12-06 07:50:22',1,16),(30,'some text 333','2025-12-06 07:52:27','2025-12-06 07:52:27',1,17),(33,'text 333333333333333','2025-12-07 08:14:22','2025-12-07 08:14:22',1,20),(34,'4444444444444444','2025-12-07 08:17:02','2025-12-07 08:17:02',1,21),(35,'i like it updated','2025-12-07 08:19:58','2025-12-08 15:19:24',4,3),(36,'qqqqqqqqqqqqqq wwwwwwwwwwwwwwwwwwwwww','2025-12-07 08:36:42','2025-12-07 08:36:42',1,3),(37,'new post','2025-12-11 17:22:30','2025-12-11 17:22:30',1,14),(38,'post 2','2025-12-11 17:26:40','2025-12-11 17:26:40',1,14),(39,'post 3 444 111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111 1111111111111111111111111111111111111111111 111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111 11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111 1111111111111111','2025-12-11 17:36:33','2025-12-11 17:41:12',1,14),(40,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','2025-12-11 17:41:59','2025-12-11 17:43:41',1,14),(41,'new post 6 666666','2025-12-11 17:49:49','2025-12-11 17:50:08',1,14),(42,'post 7','2025-12-11 17:50:43','2025-12-11 17:50:43',1,14),(43,'post 8','2025-12-11 17:50:48','2025-12-11 17:50:48',1,14),(44,'post 9','2025-12-11 17:50:54','2025-12-11 17:50:54',1,14),(45,'post 10','2025-12-11 17:50:59','2025-12-11 17:50:59',1,14),(46,'post 11','2025-12-11 17:51:03','2025-12-11 17:51:03',1,14),(48,'post 12','2025-12-16 11:18:08','2025-12-16 11:18:08',1,14),(49,'post 13','2025-12-16 11:18:14','2025-12-16 11:18:14',1,14),(50,'post 14','2025-12-16 11:18:18','2025-12-16 11:18:18',1,14),(51,'post 15','2025-12-16 11:18:23','2025-12-16 11:18:23',1,14),(52,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim qq','2025-12-16 15:25:50','2025-12-16 15:26:10',1,14),(53,'test','2025-12-16 15:29:57','2025-12-16 15:29:57',5,3),(54,'test','2025-12-17 10:49:04','2025-12-17 10:49:04',1,23),(55,'post 1','2025-12-18 15:53:16','2025-12-18 15:53:16',1,23),(60,'text 4444444444444444444444444444444444444','2026-01-04 20:11:03','2026-01-04 20:11:03',1,20),(61,'new post for subscribers','2026-01-05 20:32:57','2026-01-05 20:32:57',4,2),(62,'2 new post for subscribers','2026-01-06 19:35:11','2026-01-06 19:35:11',4,2),(63,'3 new post for subscribers','2026-01-08 20:28:32','2026-01-08 20:28:32',4,2),(64,'4 new post for subscribers','2026-01-11 19:07:56','2026-01-11 19:07:56',4,2),(65,'post for subscribers','2026-01-11 19:17:43','2026-01-11 19:17:43',4,20),(66,'post for subscribers','2026-01-11 19:18:01','2026-01-11 19:18:01',4,3),(67,'post for subscribers','2026-01-11 19:18:10','2026-01-11 19:18:10',4,23),(68,'post for subscribers','2026-01-11 19:18:18','2026-01-11 19:18:18',4,14),(69,'post for subscribers','2026-01-11 19:18:26','2026-01-11 19:18:26',4,21),(70,'post for subscribers','2026-01-11 19:18:33','2026-01-11 19:18:33',4,17),(71,'post for subscribers','2026-01-11 19:18:40','2026-01-11 19:18:40',4,16),(72,'post for subscribers','2026-01-11 19:18:45','2026-01-11 19:18:45',4,11),(73,'post for subscribers','2026-01-11 19:18:52','2026-01-11 19:18:52',4,10),(74,'post for subscribers','2026-01-11 19:18:58','2026-01-11 19:18:58',4,9),(75,'post for subscribers','2026-01-11 19:19:05','2026-01-11 19:19:05',4,8),(76,'post for subscribers','2026-01-11 19:20:02','2026-01-11 19:20:02',4,7),(77,'post for subscribers','2026-01-11 19:20:09','2026-01-11 19:20:09',4,6),(78,'post for subscribers 2','2026-01-13 11:23:30','2026-01-13 11:23:30',4,6),(79,'post for subscribers 2','2026-01-13 11:23:39','2026-01-13 11:23:39',4,7),(80,'post for subscribers 2','2026-01-13 11:23:50','2026-01-13 11:23:50',4,8),(81,'post for subscribers 2','2026-01-14 08:44:11','2026-01-14 08:44:11',4,9),(82,'post for subscribers 2','2026-01-14 08:44:22','2026-01-14 08:44:22',4,10),(83,'post for subscribers 2','2026-01-14 08:44:31','2026-01-14 08:44:31',4,11),(84,'post for subscribers 2','2026-01-14 08:44:39','2026-01-14 08:44:39',4,16),(85,'post for subscribers 2','2026-01-14 08:44:46','2026-01-14 08:44:46',4,17),(86,'post for subscribers 2','2026-01-14 08:44:53','2026-01-14 08:44:53',4,21),(87,'post for subscribers 2','2026-01-14 08:45:04','2026-01-14 08:45:04',4,14),(88,'post for subscribers 2','2026-01-14 08:45:13','2026-01-14 08:45:13',4,23),(89,'post for subscribers 2','2026-01-14 08:45:23','2026-01-14 08:45:23',4,3),(90,'post for subscribers 2','2026-01-14 08:45:32','2026-01-14 08:45:32',4,20),(91,'post for subscribers 2','2026-01-14 08:45:41','2026-01-14 08:45:41',4,2),(92,'1','2026-01-14 08:56:07','2026-01-14 08:56:07',4,2),(93,'2','2026-01-14 08:56:12','2026-01-14 08:56:12',4,2),(94,'3','2026-01-14 08:56:15','2026-01-14 08:56:15',4,2),(95,'qqqqqqq','2026-01-14 09:30:17','2026-01-14 09:30:17',1,2),(96,'wwwwwwwww','2026-01-14 09:30:24','2026-01-14 09:30:24',1,2),(97,'eeeeeeeeeeee','2026-01-14 09:30:28','2026-01-14 09:30:28',1,2),(98,'rrrrrr','2026-01-14 09:30:59','2026-01-14 09:30:59',1,2),(99,'ttttt','2026-01-15 16:30:44','2026-01-15 16:30:44',1,2),(100,'updated 4','2026-01-15 16:36:09','2026-01-15 20:51:07',1,2),(101,'some text','2026-01-15 20:52:23','2026-01-15 20:52:23',1,2),(102,'some text 2','2026-01-15 20:53:22','2026-01-15 20:53:22',1,2),(103,'some text 3','2026-01-15 20:53:27','2026-01-15 20:53:27',1,2),(104,'some text 4','2026-01-15 20:53:32','2026-01-15 20:53:32',1,2),(105,'some text 5','2026-01-16 08:48:59','2026-01-16 08:48:59',1,2),(106,'test create post','2026-01-16 08:59:38','2026-01-16 08:59:38',1,2),(107,'test create post 2','2026-01-16 08:59:56','2026-01-16 08:59:56',1,2),(108,'test create post 2','2026-01-16 08:59:59','2026-01-16 08:59:59',1,2),(109,'test create post 2','2026-01-16 09:00:01','2026-01-16 09:00:01',1,2),(110,'test create post 3','2026-01-16 09:02:19','2026-01-16 09:02:19',1,2),(111,'test create post 4','2026-01-16 09:05:09','2026-01-16 09:05:09',1,2),(112,'test create post 55555','2026-01-16 09:05:23','2026-01-16 09:10:54',1,2),(113,'test create post 6666','2026-01-16 09:05:28','2026-01-16 09:09:04',1,2),(114,'test create post 7','2026-01-16 09:05:34','2026-01-16 09:05:34',1,2),(115,'post 111','2026-01-17 19:26:15','2026-01-17 19:26:15',1,2),(116,'post 112','2026-01-17 19:26:28','2026-01-17 19:26:28',1,2),(117,'post 113','2026-01-17 19:26:32','2026-01-17 19:26:32',1,2),(118,'post 114','2026-01-17 19:26:35','2026-01-17 19:26:35',1,2),(119,'post 115','2026-01-17 19:26:40','2026-01-17 19:26:40',1,2),(120,'post 116','2026-01-17 19:26:47','2026-01-17 19:26:47',1,2),(121,'post 117','2026-01-17 19:26:54','2026-01-17 19:26:54',1,2),(122,'post 118','2026-01-17 19:26:58','2026-01-17 19:26:58',1,2),(123,'post 119','2026-01-17 19:27:05','2026-01-17 19:27:05',1,2),(124,'post 120','2026-01-17 19:27:10','2026-01-17 19:27:10',1,2),(125,'post 121','2026-01-17 19:43:03','2026-01-17 19:43:03',1,2),(126,'post 122','2026-01-17 19:43:07','2026-01-17 19:43:07',1,2),(127,'post 123','2026-01-17 19:43:11','2026-01-17 19:43:11',1,2),(128,'post 124','2026-01-17 19:43:15','2026-01-17 19:43:15',1,2),(129,'post 125','2026-01-17 19:43:20','2026-01-17 19:43:20',1,2),(130,'post 126','2026-01-17 19:43:23','2026-01-17 19:43:23',1,2),(131,'post 127','2026-01-17 19:43:26','2026-01-17 19:43:26',1,2),(132,'post 1299','2026-01-17 19:43:30','2026-01-20 20:37:01',1,2),(146,'some text 99999','2026-01-20 19:59:21','2026-01-20 20:36:46',1,2),(149,'qqqqqqqqqqqqq','2026-01-23 08:23:17','2026-01-23 08:23:17',4,2),(177,'some text #1','2026-01-26 08:14:36','2026-01-26 08:14:36',5,6),(178,'some text #2','2026-01-26 08:14:39','2026-01-26 08:14:39',5,6),(179,'some text #3','2026-01-26 08:14:42','2026-01-26 08:14:42',5,6),(180,'some text #4','2026-01-26 08:14:45','2026-01-26 08:14:45',5,6),(181,'some text #1','2026-01-26 08:15:01','2026-01-26 08:15:01',5,2),(182,'some text #1','2026-01-26 08:15:23','2026-01-26 08:15:23',5,7),(183,'some text #1','2026-01-26 08:15:26','2026-01-26 08:15:26',5,8),(184,'some text #1','2026-01-26 08:15:31','2026-01-26 08:15:31',5,9),(185,'some text #1','2026-01-26 08:15:36','2026-01-26 08:15:36',5,10),(186,'some text #1','2026-01-26 08:15:39','2026-01-26 08:15:39',5,11),(187,'some text #1','2026-01-26 08:15:46','2026-01-26 08:15:46',5,16),(188,'some text #1','2026-01-26 08:15:49','2026-01-26 08:15:49',5,17),(189,'some text #1','2026-01-26 08:15:53','2026-01-26 08:15:53',5,21),(190,'some text #1','2026-01-26 08:15:59','2026-01-26 08:15:59',5,14),(191,'some text #1','2026-01-26 08:16:02','2026-01-26 08:16:02',5,23),(192,'some text #1','2026-01-26 08:16:06','2026-01-26 08:16:06',5,3),(193,'some text #1','2026-01-26 08:16:09','2026-01-26 08:16:09',5,20),(214,'aaa','2026-02-12 10:45:32','2026-02-12 10:45:32',1,42),(219,'some text, now updated','2026-02-19 19:48:19','2026-02-19 19:55:36',14,45),(220,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','2026-02-19 20:07:35','2026-02-19 20:07:35',5,45);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reports` (
  `id` int NOT NULL AUTO_INCREMENT,
  `postId` int NOT NULL,
  `reporterId` int DEFAULT NULL,
  `reason` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `status` enum('pending','rejected','banned post','banned user and post') DEFAULT 'pending',
  PRIMARY KEY (`id`),
  UNIQUE KEY `reports_post_id_reporter_id` (`postId`,`reporterId`),
  KEY `reporterId` (`reporterId`),
  CONSTRAINT `reports_ibfk_7` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reports_ibfk_8` FOREIGN KEY (`reporterId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reports`
--

LOCK TABLES `reports` WRITE;
/*!40000 ALTER TABLE `reports` DISABLE KEYS */;
INSERT INTO `reports` VALUES (30,193,8,'report #111','2026-02-17 09:13:28','pending'),(31,192,8,'report #222','2026-02-17 09:13:41','pending'),(32,53,8,'report #3','2026-02-17 09:13:54','pending'),(34,220,14,'report #2','2026-02-19 20:27:46','rejected');
/*!40000 ALTER TABLE `reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscriptions`
--

DROP TABLE IF EXISTS `subscriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscriptions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `threadId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `lastReadAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `threadId` (`threadId`),
  CONSTRAINT `subscriptions_ibfk_15` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `subscriptions_ibfk_16` FOREIGN KEY (`threadId`) REFERENCES `threads` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscriptions`
--

LOCK TABLES `subscriptions` WRITE;
/*!40000 ALTER TABLE `subscriptions` DISABLE KEYS */;
INSERT INTO `subscriptions` VALUES (4,1,2,'2026-01-10 20:20:08','2026-02-17 21:10:00','2026-02-17 21:10:00'),(5,1,3,'2026-01-11 11:04:48','2026-02-17 20:50:20','2026-02-17 20:50:20'),(6,1,20,'2026-01-11 19:15:52','2026-02-15 19:43:35','2026-02-15 19:43:35'),(7,1,23,'2026-01-11 19:15:57','2026-02-15 19:31:32','2026-02-15 19:31:32'),(8,1,14,'2026-01-11 19:16:04','2026-02-17 20:48:58','2026-02-17 20:48:58'),(9,1,21,'2026-01-11 19:16:08','2026-02-12 11:04:22','2026-02-12 11:04:22'),(10,1,17,'2026-01-11 19:16:12','2026-01-15 19:34:43','2026-01-15 19:34:43'),(11,1,16,'2026-01-11 19:16:17','2026-01-15 19:34:49','2026-01-15 19:34:49'),(12,1,11,'2026-01-11 19:16:20','2026-02-17 20:14:32','2026-02-17 20:14:32'),(13,1,10,'2026-01-11 19:16:24','2026-01-15 19:34:59','2026-01-15 19:34:59'),(14,1,9,'2026-01-11 19:16:45','2026-01-15 19:34:56','2026-01-15 19:34:56'),(15,1,8,'2026-01-11 19:16:51','2026-01-15 19:35:01','2026-01-15 19:35:01'),(16,1,7,'2026-01-11 19:16:59','2026-02-12 10:33:07','2026-02-12 10:33:07'),(17,1,6,'2026-01-11 19:17:06','2026-02-12 10:32:59','2026-02-12 10:32:59'),(22,14,3,'2026-02-19 20:02:01','2026-02-19 20:27:27','2026-02-19 20:27:27'),(23,14,45,'2026-02-19 20:04:08','2026-02-19 20:27:40','2026-02-19 20:27:40');
/*!40000 ALTER TABLE `subscriptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `threads`
--

DROP TABLE IF EXISTS `threads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `threads` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `authorId` int DEFAULT NULL,
  `forumId` int DEFAULT NULL,
  `views` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `authorId` (`authorId`),
  KEY `forumId` (`forumId`),
  CONSTRAINT `threads_ibfk_27` FOREIGN KEY (`authorId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `threads_ibfk_28` FOREIGN KEY (`forumId`) REFERENCES `forums` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `threads`
--

LOCK TABLES `threads` WRITE;
/*!40000 ALTER TABLE `threads` DISABLE KEYS */;
INSERT INTO `threads` VALUES (1,'Our forum has opened','2025-11-17 18:09:30','2026-02-15 19:04:45',1,1,6),(2,'The Green Mile','2025-11-18 10:19:54','2026-01-26 08:15:01',1,3,606),(3,'The Shawshank Redemption','2025-11-26 09:46:05','2026-02-19 20:07:59',1,3,107),(6,'Test 1','2025-11-28 09:00:31','2026-01-26 08:14:45',1,3,34),(7,'Test 2','2025-11-28 09:00:38','2026-01-26 08:15:23',1,3,17),(8,'Test 3','2025-11-28 09:00:44','2026-01-26 08:15:26',1,3,15),(9,'Test 4','2025-11-28 09:01:00','2026-01-26 08:15:31',1,3,14),(10,'Test 5','2025-11-28 09:01:03','2026-01-26 08:15:36',1,3,17),(11,'Test 6','2025-11-28 09:01:07','2026-01-26 08:15:39',1,3,15),(14,'Thread updated 9','2025-12-06 07:42:38','2026-02-11 20:59:41',1,3,61),(16,'Thread 222','2025-12-06 07:50:22','2026-01-26 08:15:46',1,3,15),(17,'Thread 333','2025-12-06 07:52:27','2026-01-26 08:15:49',1,3,15),(20,'New thread 33333','2025-12-07 08:14:22','2026-01-26 08:16:09',1,3,43),(21,'New thread 444444 updated','2025-12-07 08:17:02','2026-01-26 08:15:53',1,3,15),(23,'New thread 123','2025-12-16 09:49:04','2026-01-26 08:16:02',1,3,24),(42,'Thread with very long title aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa','2026-02-12 10:45:32','2026-02-15 19:51:38',1,3,16),(45,'My new thread','2026-02-19 19:48:19','2026-02-19 20:07:35',14,3,15);
/*!40000 ALTER TABLE `threads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `role` enum('user','moderator','admin') DEFAULT 'user',
  `lastSignIn` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `bio` text,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Eddard','admin@mail.com','$2b$10$BzEAicBAQvT.rDXOLs4PReeEtgupHXe3YAU/hu3oQX/NXfbjnXVIq','avatar-b0e4ca0d-6082-469b-83f2-698c390a91b4.jpg','admin','2026-02-19 20:50:45','2025-11-17 17:48:03','2026-02-19 20:50:45','Eddard Stark is a central character in A Song of Ice and Fire by George R. R. Martin. He serves as the Lord of Winterfell and Warden of the North, ruling from the ancient castle of Winterfell with a deep sense of honor, duty, and loyalty. Raised in the harsh climate of the North, Ned embodies the Stark family words: “Winter is Coming,” reflecting his serious, vigilant nature.\n\nAfter the death of Jon Arryn, Ned is appointed Hand of the King by his old friend, King Robert Baratheon. Reluctantly leaving the North, he travels to King’s Landing, where he becomes entangled in the dangerous political intrigues of the royal court. Unlike many players in the capital, Ned values truth and justice over manipulation and ambition, which ultimately places him at odds with powerful enemies.',NULL),(4,'Daenerys','moderator@mail.com','$2b$10$JVC7GwOXYEaVJAT7FsCc.O3UxkdhDawRsh/V6yaCa6Hkp/qe99OoK','avatar-e996c424-b00f-4c9e-aa49-eb6d797a48eb.jpg','moderator','2026-02-15 19:05:55','2025-12-07 08:19:08','2026-02-15 19:27:57','Daenerys Targaryen is a central figure in A Song of Ice and Fire by George R. R. Martin. The last known daughter of King Aerys II Targaryen, she is born into exile after her family is overthrown during Robert’s Rebellion. Raised across the Free Cities of Essos, Daenerys grows up under the shadow of her family’s lost throne and her brother Viserys’s ambition to reclaim it.\n\nInitially timid and powerless, Daenerys gradually transforms into a determined and commanding leader. Her marriage to Khal Drogo becomes a turning point, shaping her strength and independence. After the birth of her dragons—Drogon, Rhaegal, and Viserion—she earns the title “Mother of Dragons” and begins building an army, freeing enslaved people in cities such as Astapor and Meereen. Her rule is defined by a fierce desire to break chains and create a more just world.\n\nDriven by destiny and a belief in her rightful claim to the Iron Throne, Daenerys inspires fierce loyalty among her followers. Yet her journey is also marked by inner conflict, as the burden of power and the legacy of House Targaryen test her ideals.',NULL),(5,'Cersei','cersei@mail.com','$2b$10$504nmbwExn56/gPX78D.F./QwGjYRGwXrkpZdWCYAqGFPSfu8JAlS','avatar-77daf89a-bef2-4dad-b299-e36d7d53b6b7.jpg','user','2026-02-19 20:07:14','2025-12-16 15:29:28','2026-02-19 20:07:14','Cersei Lannister is a central antagonist in A Song of Ice and Fire by George R. R. Martin. Born into the powerful House Lannister, she is the daughter of Tywin Lannister and twin sister to Jaime Lannister. From a young age, Cersei develops a fierce ambition and a deep resentment of the limitations placed on her as a woman in a patriarchal society.\n\nAs Queen of the Seven Kingdoms through her marriage to King Robert Baratheon, Cersei navigates the treacherous politics of King’s Landing with cunning and determination. Her primary motivation is the protection and advancement of her children—Joffrey, Myrcella, and Tommen—whom she loves intensely. However, her secret relationship with her twin brother Jaime and the true parentage of her children become dangerous secrets that threaten her position and fuel conflict within the realm.\n\nCersei is intelligent, manipulative, and often ruthless, willing to use any means necessary to maintain power. While she sees herself as a protector of her family and legacy, her paranoia and desire for control frequently lead to destructive decisions.',NULL),(8,'Ciri','ciri@mail.com','$2b$10$EufoRlVu9UjDAVUmdDm4cOVKXi9KtHIsz3cPwHb6kr1nST/nJjf1q','avatar-8d899d88-4846-4f14-9e44-9d85c08eca01.jpg','user','2026-02-17 20:32:53','2026-01-12 20:38:06','2026-02-17 20:32:53','Cirilla Fiona Elen Riannon, known as Ciri, is one of the central characters in The Witcher book series by Andrzej Sapkowski. She is the princess of Cintra and the granddaughter of Queen Calanthe. Bound to Geralt of Rivia by the Law of Surprise, Ciri becomes his adopted daughter and apprentice, forming one of the emotional cores of the saga.\n\nAfter the fall of Cintra, Ciri is forced into exile and spends much of her youth fleeing those who seek to control her for political and magical purposes. She trains at Kaer Morhen under Geralt and other witchers, learning swordsmanship and survival skills, though she is not subjected to the mutations that create witchers. Later, she studies magic under the sorceress Yennefer of Vengerberg, further developing her unique abilities.\n\nCiri possesses Elder Blood, an ancient and powerful lineage that grants her extraordinary magical potential and the ability to travel across worlds and time. Torn between destiny and her desire for freedom, she struggles to define her own identity amid war, prophecy, and manipulation. Brave, impulsive, and fiercely independent, Ciri evolves from a frightened child into one of the most powerful and significant figures in the Witcher universe.',NULL),(14,'Jon','jon@mail.com','$2b$10$jgajj.TIHIMRFUjeIot06uSFCjxCFndDjXed9C66DY7DU6n.nAfOm','avatar-645bd5db-b3c9-4ee2-ae5e-54b341a5aed7.jpg','user','2026-02-19 20:44:57','2026-02-19 15:54:07','2026-02-19 20:44:57','Jon Snow is one of the central figures in A Song of Ice and Fire by George R. R. Martin. Introduced as the illegitimate son of Eddard Stark, Jon grows up in Winterfell feeling like an outsider despite being raised alongside the Stark children. Seeking honor and purpose, he joins the Night’s Watch, the brotherhood sworn to guard the Wall and protect the realm from dangers beyond it.\n\nThroughout the story, Jon proves himself brave, honorable, and deeply loyal, often struggling between duty and personal desire. His leadership emerges during conflicts with the wildlings and the White Walkers, where he shows compassion and strategic thinking. A major revelation about his true parentage reshapes his identity and places him at the center of the struggle for power in Westeros.',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-20 15:29:16
