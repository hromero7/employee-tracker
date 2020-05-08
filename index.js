const inquirer = require("inquirer");
const connection = require("./server");
const queryFunctions = require("./app");
const cTable = require ("console.table");


const questions = [
    {
        type: "list",
        name: "main",
        message: "What would you like to do?",
        choices: ["View All Employees", 
        "View All Employees by Department", 
        "View All Employees by Roles", 
        "Add an Employee", 
        "Add a Department", 
        "Add a Role", 
        "Update Employee Role"]
    }
]

function mainMenu() {
    inquirer.prompt(questions).then(answers => {
        switch (answers.main) {
        case "View All Employees":
            queryFunctions.queryAllEmployees();
            break;
        
        case "View All Employees by Department":
            departmentSearch();
            break;
        
        case "View All Employees by Roles":
            roleSearch();
            break;
        
        case "Add an Employee":
            addEmployee();
            break;
        
        case "Add a Department":
            addDepartment();
            break;
        case "Add a Role":
            //query
            addRole();
            break;

        case "Update Employee Role":
            //query
            break;
        }

    })
} 

function departmentSearch() {
    connection.query("SELECT * FROM department", function(err, res) {
        inquirer.prompt({
            name: "department",
            type: "list",
            choices: function() {
                const choiceArr = [];
                for (let i = 0; i < res.length; i++) {
                    choiceArr.push(res[i].name);
                }
                return choiceArr;
            },
            message: "Which department would you like to search by?"
        }).then(function (answer){
            const userChoice = answer.department;
            // console.log(userChoice);
            queryFunctions.findByDepartment(userChoice);
        })
    })
    
}

function roleSearch() {
    connection.query("SELECT * FROM role", function(err, res) {
        inquirer.prompt({
            name: "role",
            type: "list",
            choices: function() {
                const choiceArr = [];
                for (let i = 0; i < res.length; i++) {
                    choiceArr.push(res[i].title);
                }
                return choiceArr;
            },
            message: "Which role would you like to search by?"
        }).then(function(answer) {
            const roleChoice = answer.role;
            queryFunctions.findAllRoles(roleChoice)
        })
    })
}

function addEmployee() {
    connection.query("SELECT * FROM employee LEFT JOIN role ON (employee.role_id = role.id) ORDER BY employee.manager_id", function(err, res) {
        inquirer.prompt([
            {
                name: "firstName",
                type: "input",
                message: "What is the employee's first name?"
            },
            {
                name: "lastName",
                type: "input",
                message: "What is the employee's last name?"
            },
            {
                name: "role",
                type: "list",
                choices: function() {
                    const choiceArr = [];
                    for (let i = 0; i < res.length; i++){
                        choiceArr.push(res[i].title);
                        
                    }
                    return choiceArr;
                },
                message: "What is the employee's role?"
            },
            {
                name: "manager",
                type: "list",
                choices: function() {
                    const managerArr = [];
                    for (let i = 0; i < res.length; i++){
                        if(res[i].manager_id === null) res[i].manager_id = "None";
                        managerArr.push(res[i].manager_id);
                    }
                    return managerArr;
                },
                message: "Who is the employee's manager?"
                
            }
        ]).then(function(answers){
            // console.log(answers.role);
            connection.query("SELECT * FROM employee LEFT JOIN role ON (employee.role_id = role.id) WHERE (role.title) = ?", [answers.role], function(err, res){
                const roleId = res[0].role_id;
                queryFunctions.addNewEmployee(answers, roleId);
            })
        })
    })
}

function addDepartment() {
    inquirer.prompt({
        name: "name",
        type: "input",
        message: "What is the name of the department?"
    }).then(function(answer){
        const departmentName = answer.name;
        queryFunctions.addNewDepartment(departmentName);
    })
}

function addRole() {
    connection.query("SELECT * FROM department", function(err, res){
        inquirer.prompt([
            {
                name: "title",
                type: "input",
                message: "What is the name of the role?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary of the role?"
            },
            {
                name: "department",
                type: "list",
                choices: function() {
                    const choiceArr = [];
                    for (let i = 0; i < res.length; i++) {
                        choiceArr.push(res[i].name);
                    }
                    return choiceArr;
                },
                message: "Which department does the role belong to?"
            }
        ]).then(function (answers){
            connection.query("SELECT * FROM department WHERE (department.name) = ?", [answers.department], function(err, res){
                const departmentId = res[0].id;
                queryFunctions.addNewRole(answers, departmentId);
            })
        })
    })
    
}
mainMenu();
