var mysql = require("mysql")
var inquirer = require("inquirer");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_db"
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    afterConnection()
});

function afterConnection() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log(res);
        purchase()
    })
}

function validateInput(value) {
    var integer = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);
    if (integer & (sign === 1)) {
        return true;
    } else {
        return "Please enter a number greater than zero"
    }
}

function purchase() {
    inquirer.prompt([{
        type: "input",
        name: "item_id",
        message: "What is the ID of the product you'd like to purchase?",
        validate: validateInput,
        filter: Number
    }, ]).then(function (input) {
        var itemID = input.item_id;
        var qty = input.stock_quantity;
        var queryStr = "SELECT * FROM products WHERE ?";

        connection.query(queryStr, {
            item_id: itemID
        }, function (err, data) {
            if (err) throw err;
            else {
                chooseQty(itemID);
            }
        })
    })
}

function chooseQty(qty) {
    inquirer.prompt([{
        type: "input",
        name: "quantity",
        message: "How much of this item do you need?",
        filter: Number
    }]).then(function (input) {
        var item = qty;
        var quantity = input.quantity;
        var queryStr = "select * FROM products WHERE ?";

        connection.query(queryStr, {
            item_id: item,
            function (err, data) {
                if (err) throw err;
                var productData = data[0];
                if (quantity <= productData.stock_quantity) {
                    console.log("Great! Your order has been placed!");
                    var updateQueryStr = "UPDATE products SET stock_quantity = " + (productData.stock_quantity - quantity) + " WHERE item_id = " + item;
                    connection.query(updateQueryStr, function (err, data) {
                        if (err) throw err;
                        console.log("Your order has been placed. Your total is $" + (productData.price * quantity));
                        connection.end();
                    })
                } else {
                    console.log("Sorry, there is not enough of this item in stock. Please choose a smaller quantity.")
                }
            }
        })
    })
}