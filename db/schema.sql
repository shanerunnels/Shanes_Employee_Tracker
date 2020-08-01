DROP DATABASE IF EXISTS employeetracker_db;

CREATE DATABASE employeetracker_db;

USE employeetracker_db;

CREATE TABLE department (
id INT AUTO_INCREMENT PRIMARY KEY;
dept_name VARCHAR(30);
);

CREATE TABLE role (
id INT AUTO_INCREMENT PRIMARY KEY;
title VARCHAR(30);
salary DECIMAL;
department_id INT FOREIGN KEY;
);

CREATE TABLE employee (
id INT AUTO_INCREMENT PRIMARY KEY;
first_name VARCHAR(30);
last_name VARCHAR(30);
role_id ID INT;
manager_id INT FOREIGN KEY;
);