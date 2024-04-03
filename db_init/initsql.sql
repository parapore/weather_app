CREATE TABLE `weather` (
  `id` int NOT NULL AUTO_INCREMENT,
  `prefecture` varchar(45) DEFAULT NULL,
  `yyyy_mm` int DEFAULT NULL,
  `average_tempreture` double DEFAULT NULL,
  `summer_day` int DEFAULT NULL,
  `winter_day` int DEFAULT NULL,
  `sunny_day` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=208 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `test`.`weather` (`id`, `prefecture`, `yyyy_mm`, `average_tempreture`, `summer_day`, `winter_day`, `sunny_day`) VALUES ('1', 'chiba', '20240330', '20', '20', '10', '25');