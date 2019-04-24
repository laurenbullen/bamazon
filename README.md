# Bamazon
## Purpose
To create an Amazon-like marketplace that uses Node.js and MySQL that takes in orders from customers and depletes the stock numbers when a purchase is made.

## Overview

1. Create a database called `bamazon`.
2. Populate create a table called `products`.
3. The ``products`` table should have the following columns:
   
   * item_id (unique id for each product)

   * product_name (Name of product)

   * department_name

   * price (cost to customer)

   * stock_quantity (how much of the product is available in stores)
 

4. Add 10 items to populate the `products` table.
![image](/images/database.png) 

5. Then create Node application bamazon.js. Running this application will show a table with all of the 10 products and their associated details (item_id, product_name, department_name, price, stock_quantity).

6. The app will then prompt the user with the following question:
- `What is the ID of the item you are looking for? [Quit with Q]`

7. The user then either inputs the item_id (integer) or the the letter "Q" to quit. 

8. If an item_id (1-10) was chosen, the user will be prompted with the following question:
- `How many would you like to purchase? [Quit with Q]`

![image](/images/first.png)

9. Once the user enters the quantity  to purchase, the app will check to make sure there is enough quanitity of that product to purchase. 
- If there is insufficient quantity, the app will log the message `Sorry, we don't have that many in stock!`

10. If there is sufficient quantity, the makePurchase function will run and that number will be deducted from the inventory of that product. This will be reflected in the MySQL database.

![image](/images/second.png)

11. Quiting at any point will end the session with the message `Goodbye!` 

![image](/images/third.png)

