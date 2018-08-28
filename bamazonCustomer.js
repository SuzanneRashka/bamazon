var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "bamazonDB"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  displayAllItems();
});

function displayAllItems() {
  //   console.log("Selecting all products... \n");
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([{
        name: "initialize",
        type: "input",
        choices: function () {
          var choiceArray = [];
          var tableArray = [];
          for (var i = 0; i < res.length; i++) {
            tableArray.push(res[i]);
          }
          console.table(tableArray);
          return choiceArray;
        },
        message: "What is the item number of the product you would like to buy?"
      }])
      .then(function (answer) {
        quantity(answer);
      });
  });
}

function quantity(answer) {
  inquirer.prompt([{
    name: "quantity",
    type: "input",
    message: "How many would you like to purchase?"
  }]).then(function (number) {
    if (answer.quantity) {
      minus stock--
      if (stock < 0) {
        console.log("We dont have enough product for you")
      }

    }
  })
}

function hasStock(answer) {
  console.log(answer.stock_quantity + "quantity")
}
// product_name, department_name, price, stock_quantity

//   console.log(table.toString());
// } // end function