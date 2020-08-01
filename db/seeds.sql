INSERT INTO department (dept) VALUES

("Manager"),
("Human Resources"),
("Server"),
("Software Developer"),
("Assistant Manager"),
("Hostess")

SELECT * FROM departments;

INSERT INTO role (title, salary, department_id) VALUES

("Human Resources", 60000, 23),
("Server", 35000, 34),
("Software Developer", 100000, 44),
("Server", 32000, 68),
("Hostess", 30000, 89),
("Assistant Manager", 45000, 45),
("Manager", 50000, 20)

SELECT * FROM role;

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES

("Emily", "Russell", 23, 22),
("Brett", "Lucky", 34, 33),
("Shane", "Runnels", 44, 43),
("Tony", "Wawa", 68, 67),
("Wonder", "Woman", 89, 88),
("Spider", "Man", 45, 44),
("Super", "Man", 20, 19),
("Weird", "Man", 23, 21),
("blabla", "Bla", 34, 32),
("Hanna", "Watkins", 44, 41),
("Miley", "Cyrus", 68, 66),
("William", "Drinkabeer", 89, 87)

SELECT * FROM employee;
