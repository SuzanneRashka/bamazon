var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "bamazonDB"
});

connection.connect(function (err) {
  if (err) throw err;
  display();
});

function display() {
  queryStr = "SELECT * FROM products";
  connection.query(queryStr, function (err, res) {
    if (err) throw err;

    var tableArray = [];

    for (var i = 0; i < res.length; i++) {
      tableArray.push(res[i]);
    }
    console.table(tableArray);
    promptPurchase();
  });
}

function promptPurchase() {
  inquirer
    .prompt([{
        name: "item_id",
        type: "input",
        message: "What is the item number of the product you would like to buy?",
        filter: Number
      },
      {
        type: "input",
        name: "quantity",
        message: "How many would you like to purchase?",
        filter: Number
      }
    ])
    .then(function (input) {
      var item = input.item_id;
      var quantity = input.quantity;

      connection.query(
        "SELECT * FROM products WHERE ?", {
          item_id: item
        },
        function (err, res) {
          if (err) throw err;
          if (res.length === 0) {
            console.log(
              "ERROR: Invalid item ID. Please select a valid Item ID."
            );
            display();
          } else {
            // change the quantity
            var productData = res[0];
            var chosenQuantity = input.quantity;
            if (quantity <= productData.stock_quantity) {
              console.log("Congrats! The product you want is in stock.");
              var updateQueryStr =
                "UPDATE products SET stock_quantity = stock_quantity - " + quantity +
                " WHERE item_id = " + item;
              // update the quantity
              connection.query(updateQueryStr, function (err, res) {
                if (err) throw err;
                console.log(
                  "Thank you for shopping with us! Your order has been placed."
                );
                connection.end();
              });
            } else {
              console.log("Sorry, there is not enough product in stock.");
              console.log("Please modify your order.");
              display();
            }
          }
        }
      );
    });
}