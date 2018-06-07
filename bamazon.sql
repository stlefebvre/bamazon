DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;
CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(200) NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL (10, 2) NULL,
    stock_quantity INTEGER(200) NULL,
    PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dog Unicorn Costume", "Accessories", 14.90, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("S'well Insulated Water Bottle", "Home & Kitchen", 35.00, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Women's Red A-Line Skirt", "Women's Apparel", 19.99, 10) ;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("AIR Yeezy 2 SP Red October", "Apparel", 20505.70, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Knit Beanie", "Accessories", 11.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hamburg Model D-274 Ebony Polish Concert Grand Piano", "Music", 109995.00, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lazy Paws Moose Slippers", "Accessories", 19.99, 20);

SELECT * FROM products;