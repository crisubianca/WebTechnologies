USE BaInDatabase;

CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(64) NOT NULL,
    email VARCHAR(128) NOT NULL,
    password VARCHAR(64) NOT NULL);

CREATE TABLE children(
    child_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(64) NOT NULL,
    last_name VARCHAR(64) NOT NULL,
    birthdate DATE NOT NULL,
    gender VARCHAR(10) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id));

CREATE TABLE relations(
    relation_id INT AUTO_INCREMENT PRIMARY KEY,
    child_id_1 INT NOT NULL,
    child_id_2 INT NOT NULL,
    relation_type VARCHAR(50) NOT NULL,
    FOREIGN KEY (child_id_1) REFERENCES children(child_id),
    FOREIGN KEY (child_id_2) REFERENCES children(child_id));

CREATE TABLE timeline(
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    timeline_title VARCHAR(50) NOT NULL,
    timeline_info VARCHAR(512) NOT NULL,
    child_id INT NOT NULL,
    FOREIGN KEY (child_id) REFERENCES children(child_id));

CREATE TABLE feeding_schedule(
    id INT(11) NOT NULL AUTO_INCREMENT,
    child_id INT(11) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    information TEXT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (child_id) REFERENCES children(child_id));

CREATE TABLE sleeping_schedule(
    id INT(11) NOT NULL AUTO_INCREMENT,
    child_id INT(11) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    information TEXT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (child_id) REFERENCES children(child_id));

CREATE TABLE medical_history(
    id INT(11) NOT NULL AUTO_INCREMENT,
    child_id INT(11) NOT NULL,
    date DATE NOT NULL,
    age VARCHAR(20) NOT NULL,
    weight INT(11) NOT NULL,
    height INT(11) NOT NULL,
    medical_procedure VARCHAR(128) NOT NULL,
    additional_information TEXT,
    PRIMARY KEY (id),
    FOREIGN KEY (child_id) REFERENCES children(child_id));