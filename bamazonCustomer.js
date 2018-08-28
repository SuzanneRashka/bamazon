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
  // console.log("connected as id " + connection.threadId + "\n");
  display();
});

function display() {
  queryStr = "SELECT * FROM products";
  connection.query(queryStr, function (err, res) {
    if (err) throw err;

    // console.log('Existing Inventory: ');
    // console.log("---------------------------------------------------------------------\n");
    var tableArray = [];
    // ****************  CAN'T MAKE FOR LOOP EXCLUDE QUANTITY
    for (var i = 0; i < res.length; i++) {
      tableArray.push(res[i]);
    }
    console.table(tableArray);

    // var strOut = '';
    // for (var i = 0; i < res.length; i++) {
    //   strOut = '';
    //   strOut += 'Item ID: ' + res[i].item_id + '  //  ';
    //   strOut += 'Product Name: ' + res[i].product_name + '  //  ';
    //   strOut += 'Price: $' + res[i].price + '\n';

    //   console.log(strOut);
    // }

    // console.log("---------------------------------------------------------------------\n");

    //Prompt the user for item/quantity they would like to purchase
    promptPurchase();
  });
}

function promptPurchase() {
  inquirer
    .prompt([{
        name: "item_id",
        type: "input",
        // choices: function () {
        //   var choiceArray = [];
        //   var tableArray = [];
        //   for (var i = 0; i < res.length; i++) {
        //     tableArray.push(res[i]);
        //   }
        //   console.table(tableArray);
        //   return choiceArray;
        // },
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
      // console.log('Customer has selected: \n    item_id = ' + input.item_id + '\n    quantity = ' + input.stock_quantity);
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
            if (quantity <= productData.stock_quantity) {
              console.log("Congrats! The product you want is in stock.");
              var updateQueryStr =
                "UPDATE products SET stock_quantity = stock_quantity - " + quantity +
                " WHERE item_id = " + item;
              // console.log('updateQueryStr = ' + updateQueryStr);
              // update the quantity
              connection.query(updateQueryStr, function (err, res) {
                if (err) throw err;
                // console.log(res);
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