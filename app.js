const connection = require("./server");
const cTable = require ("console.table");

connection;

const queryAllEmployees = function () {
    connection.query("SELECT first_name, last_name, title, name, salary, manager_id FROM employee LEFT JOIN role ON (employee.role_id = role.id) JOIN department ON (department.id = role.department_id)", function(err, res) {
        if (err) throw err;
        console.table(res);
        connection.end();
        
        // console.log(query.sql);
    })
}

const findByDepartment = function (userChoice) {
    connection.query("SELECT first_name, last_name, title, name, salary FROM department LEFT JOIN role ON (department.id = role.department_id) JOIN employee ON (employee.role_id = role.id) WHERE (department.name = ?)", [userChoice], function(err, res) {
        console.table(res);
    })
    connection.end();
}

const findAllRoles = function (roleChoice) {
    connection.query("SELECT first_name, last_name, title, name, salary, manager_id FROM employee LEFT JOIN role ON (employee.role_id = role.id) JOIN department ON (department.id = role.department_id) WHERE (role.title = ?)", [roleChoice], function(err, res){
        console.table(res);
        connection.end();
    })
}


module.exports = {
    queryAllEmployees,
    findByDepartment,
    findAllRoles
};