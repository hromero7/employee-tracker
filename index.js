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
            //query function
            break;
        
        case "View All Employees by Roles":
            //query function
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

mainMenu();
