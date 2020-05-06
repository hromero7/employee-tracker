const connection = require("./server");
const cTable = require ("console.table");

connection;
// function queryDanceSongs() {
//     var query = connection.query("SELECT * FROM songs WHERE genre=?", ["Dance"], function(err, res) {
//       if (err) throw err;
//       for (var i = 0; i < res.length; i++) {
//         console.log(res[i].id + " | " + res[i].title + " | " + res[i].artist + " | " + res[i].genre);
//       }
//     });
  
//     // logs the actual query being run
//     console.log(query.sql);
//     connection.end();
//   }

const queryAllEmployees = function () {
    const query = connection.query("SELECT * FROM employee LEFT JOIN role ON (employee.role_id = role.id)", function(err, res) {
        if (err) throw err;
        console.table(res);
        connection.end();
        
        // console.log(query.sql);
    })
}

const findAllRoles = function () {
    console.log("hello world");
    connection.end();
    //use joins to find employee by roles
    //use role id to join table with role
}


module.exports = {
    queryAllEmployees,
    findAllRoles
};