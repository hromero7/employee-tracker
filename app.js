const connection = require("./server");
const cTable = require ("console.table");

connection;

const queryAllEmployees = function () {
    connection.query("SELECT employee.id, first_name, last_name, title, name, salary, manager_id FROM employee LEFT JOIN role ON (employee.role_id = role.id) JOIN department ON (department.id = role.department_id)", function(err, res) {
        if (err) throw err;
        console.table(res);
        connection.end();
        
        // console.log(query.sql);
    })
}

const findByDepartment = function (userChoice) {
    connection.query("SELECT employee.id, first_name, last_name, title, name, salary FROM department LEFT JOIN role ON (department.id = role.department_id) JOIN employee ON (employee.role_id = role.id) WHERE (department.name = ?)", [userChoice], function(err, res) {
        console.table(res);
    })
    connection.end();
}

const findAllRoles = function (roleChoice) {
    connection.query("SELECT employee.id, first_name, last_name, title, name, salary, manager_id FROM employee LEFT JOIN role ON (employee.role_id = role.id) JOIN department ON (department.id = role.department_id) WHERE (role.title = ?)", [roleChoice], function(err, res){
        console.table(res);
        connection.end();
    })
}

const addNewEmployee = function(answers, roleId) {
    if(answers.manager === "None") answers.manager =  null;
    connection.query(
        "INSERT INTO employee SET ?",
        {
            first_name: answers.firstName,
            last_name: answers.lastName,
            role_id: roleId,
            manager_id: answers.manager
        },
        function(err) {
            if (err) throw err;
            console.log(`${answers.firstName} ${answers.lastName} was successfully added to the system.`)
        })
}

const addNewDepartment = function(departmentName) {
   connection.query( 
       "INSERT INTO department SET ?",
    {
        name: departmentName
    },
    function(err) {
        if (err) throw err;
        console.log(`Added ${departmentName} to the database.`)
    })
}

const addNewRole = function(answers, departmentId) {
    connection.query(
        "INSERT INTO role SET ?",
        {
            title: answers.title,
            salary: answers.salary,
            department_id: departmentId
        },
        function(err) {
            if (err) throw err;
            console.log(`${answers.title} successfully added to the database.`)
        }
    )
}

const updateEmployee = function(answers){
    connection.query(
        "UPDATE employee SET role_id = ? WHERE id = ?", [answers.roleId, answers.employee], function(err, res){
            if (err) throw err;
            console.log("Employee role has been updated.");
        });
}
module.exports = {
    queryAllEmployees,
    findByDepartment,
    findAllRoles,
    addNewEmployee,
    addNewDepartment,
    addNewRole,
    updateEmployee
};