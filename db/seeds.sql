USE employee_db;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Horacio", "Romero", 1, 10),
("Ralph", "Roman", 2, null),
("Monica", "Dixon", 3, 20),
("Tom", "Hanks", 4, 30),
("Chris", "Pratt", 5, 40);

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 100000, 1),
("Project Manager", 80000, 1),
("HR", 90000, 2),
("Sales Intern", 40000, 3),
("Graphic Designer", 40000, 4);

INSERT INTO department (name)
VALUES("Engineering"),
("Human Resources"),
("Sales"),
("Product Design");