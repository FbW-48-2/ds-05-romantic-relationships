# Data Modelling - Exercise #2 - References (Ref)

In this exercise we want to train creating relationship by REFERENCING MongoDB documents
(= outsourcing related documents to own collections)

## Create a mini shop data model

### Part 1 - Order model

Please visit the file models.js

* Create an order model (with a field: order_date)

    * How to work with dates? => https://mongoosejs.com/docs/tutorials/dates.html
        * The initial two code snippets show to define and insert a date (that's all you need)

* Connect Orders and Customers
    
    * Place a ref to the customer model in the order schema ("Every order has exaxtly ONE customer")
   
    * Hint: use a "ref" field to declare relations: ` { type: Schema.Types.ObjectId, ref: '<OtherModel>' } `


## Seed on, baby...

Update your seed script to insert relational data:

- Setup purging (=removing) of all data before seeding
    - Clear all orders
    - Clear all customers

- Create two orders:
	- customer 1 placed an order today
	- customer 2 placed an order yesterday
    - hint: you can hardcode the order dates (format: YYYY-MM-DD)

Test if it worked by checking the created data in Compass...


## Show orders

Adapt server.js

Create a new GET route /orders

Fetch the orders from DB here please and return them with res.json


## BONUS TASK - Give us some structure...

* Outsource the schemas + models to a models folder 
    * Create a file for each schema: customer.js, order.js
    * Export the model at the end of each file

* Adapt the imports in your files seed.js & server.js

In the next task we will add pizzas to our orders to finalize our order model...


