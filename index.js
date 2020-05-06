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
            //query function
            break;
        
        case "Add a Department":
            //query
            break;
        case "Add a Role":
            //query
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
    
}
mainMenu();
