USE BeInDatabase;

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
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id));

CREATE TABLE relations(
    relation_id INT AUTO_INCREMENT PRIMARY KEY,
    child_id_1 INT NOT NULL,
    child_id_2 INT NOT NULL,
    relation_type VARCHAR(50) NOT NULL,
    FOREIGN KEY (child_id_1) REFERENCES children(child_id),
    FOREIGN KEY (child_id_2) REFERENCES children(child_id));

CREATE TABLE media(
    id INT AUTO_INCREMENT PRIMARY KEY,
    filename VARCHAR(128) NOT NULL,
    type VARCHAR(64) NOT NULL,
    caption VARCHAR(512),
    child_id INT NOT NULL,
    FOREIGN KEY (child_id) REFERENCES children(child_id));

CREATE TABLE feeding_schedule(
    id INT(11) NOT NULL AUTO_INCREMENT,
    child_id INT(11) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    food VARCHAR(64) NOT NULL,
    quantity FLOAT(2) NOT NULL,
    notes TEXT,
    PRIMARY KEY (id),
    FOREIGN KEY (child_id) REFERENCES children(child_id));

CREATE TABLE sleeping_schedule(
    id INT(11) NOT NULL AUTO_INCREMENT,
    child_id INT(11) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    duration FLOAT(2) NOT NULL,
    notes TEXT,
    PRIMARY KEY (id),
    FOREIGN KEY (child_id) REFERENCES children(child_id));

CREATE TABLE medical_history(
    id INT(11) NOT NULL AUTO_INCREMENT,
    child_id INT(11) NOT NULL,
    date DATE NOT NULL,
    doctor_name VARCHAR(64) NOT NULL,
    medical_condition VARCHAR(128) NOT NULL,
    treatment TEXT NOT NULL,
    notes TEXT,
    PRIMARY KEY (id),
    FOREIGN KEY (child_id) REFERENCES children(child_id));