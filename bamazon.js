var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon_db"
});

connection.connect(function(err) {
  console.log("connection successfull");
  makeTable();
});

var makeTable = function() {
  connection.query("SELECT * FROM products", function(err, res) {
    console.table(res);
    selectItem(res);
  });
};

var selectItem = function(inventory) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "item",
        message:
          "What is the ID of the item you are looking for? [Quit with Q]",
        validate: function(value) {
          return !isNaN(value) || value.toLowerCase() === "q";
        }
      }
    ])
    .then(function(value) {
      checkExit(value.item);
      var choiceId = parseInt(value.item);
      var product = checkInventory(choiceId, inventory);
      if (product) {
        selectQuantity(product);
      } else {
        console.log("");
        console.log("That item is not in our inventory.");
        console.log("");
      }
    });
};

var selectQuantity = function(product) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "How many would you like to purchase? [Quit with Q]",
        validate: function(value) {
          return !isNaN(value) || value.toLowerCase() === "q";
        }
      }
    ])
    .then(function(value) {
      checkExit(value.quantity);
      var quantity = parseInt(value.quantity);
      if (quantity > product.stock_quantity) {
        console.log("");
        console.log("Sorry, we don't have that many in stock!");
        console.log("");
        makeTable();
      } else {
        makePurchase(product, quantity);
      }
    });
};

var checkInventory = function(choiceId, inventory) {
  for (let i = 0; i < inventory.length; i++) {
    if (inventory[i].item_id === choiceId) {
      return inventory[i];
    }
  }
  return null;
};

var makePurchase = function(product, quantity) {
  connection.query(
    "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
    [quantity, product.item_id],
    function(err, res) {
      console.log("");
      console.log(
        `Successfully purchased ${quantity} ${product.product_name}(s)!`
      );
      console.log("");
      makeTable();
    }
  );
};

var checkExit = function(choice) {
  if (choice.toLowerCase() === "q") {
    console.log("");
    console.log("Goodbye!");
    console.log("");
    process.exit(0);
  }
};
