var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table3");

var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  displayAllItems();
});

function displayAllItems() {
  //   console.log("Selecting all products... \n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "initialize",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
            }
            return choiceArray;
          },
          message: "What item would you like to purchase?"
        }
      ])
      .then(function(anser) {
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].product_name === answer.choice) {
            chosenItem = results[i];
          }
        }
      });
  });
}

// product_name, department_name, price, stock_quantity

function printsToTable() {
  var table = new Table({
    head: ["ID", "Product", "Department", "Price", "Quantity"],
    colWidths: [10, 40, 20, 10, 10]
  });

  // table is an Array, so you can `push`, `unshift`, `splice` and friends
  table.push(
    ["1", "Item one", "kitchen", "$", 20],
    ["2", "Item two", "electronics", "$", 10]
  );

  console.log(table.toString());
} // end function
