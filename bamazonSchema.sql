DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(20) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);
-- 1
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Beats Studio3 Wireless Headphones", "Electronics", 234.00, 10);
-- 2
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Seagate Expansion 8TB Desktop External Hard Drive", "Electronics", 139.00, 10);
-- 3
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("3D Printing 4.7 Inch Moon Light Lamp", "Electronics", 20.00, 20);
-- 4
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Woman's KATE Quartz Stainless Steel and Leather Casual Watch", "Jewerly", 140.00, 10);
-- 5
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pink Octopus Ceramic 3D Coffee Mug with Tentacle Handle", "Kitchen", 18.00, 50);
-- 6
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("10 pcs Mini Micro Landscape Hedgehog Garden Decor", "Outdoor", 7.00, 50);
-- 7
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cucina Hard Porcelain Enamel Nonstick Cookware Set, 12 Piece", "Kitchen", 112.00, 15);
-- 8
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hooded Cloak for Bride - Winter REversible with Fur Trim", "Clothing", 80.00, 8);
-- 9
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Elf Earbuds Headphones", "Electronics", 12.00, 5);
-- 10
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Vertical Garden Planting Cylinder Display System for Succulent Cactus", "Decor", 15.00, 5);
