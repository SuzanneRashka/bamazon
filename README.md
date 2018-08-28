# bamazon

An Amazon-like storefront with MySQL database and a CLI with NodeJS. This application implements a simple command line based storefront using the npm inquirer package and the MySQL database backend together with the npm mysql package. Run the schema inside your MySQL client like Sequel Pro to populate the database, then you will be ready to proceed with running the Bamazon customer interface.

## To run the customer interface please follow the steps below:

  - git clone this repo
    - cd to bamazon
    - npm install
    - node bamazonCustomer.js

## Customer Interface

The customer interface allows the user to view the current inventory of store items: item IDs, descriptions, department in which the item is located and price. The user is then able to purchase one of the existing items by entering the item ID and the desired quantity. If the selected quantity is currently in stock, the user's order is fulfilled, displaying the total purchase price and updating the store database. If the desired quantity is not available, the user is prompted to modify their order.

[![asciicast](https://asciinema.org/a/fWO0mqoPfHflqxqeJ2AWLqsnF.png)](https://asciinema.org/a/fWO0mqoPfHflqxqeJ2AWLqsnF)
