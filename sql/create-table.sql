CREATE DATABASE test_backend;
USE test_backend;

CREATE TABLE csv_table (
  id INT AUTO_INCREMENT PRIMARY KEY,
  uuid VARCHAR(36) NOT NULL,
  nom VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);
