# Data Modelling - Exercise #3 - Many References

In this exercise we want to train creating relationship by REFERENCING MongoDB documents
(= outsourcing related documents to own collections)

## Continue the pizza shop data model

### Part 2 - Pizza model

* Create a pizza model (fields: name, price)

* Connect Pizzas & Orders

    * Place an array of pizza refs in the order schema ("Each order can have MANY pizzas")

    * Hint: creating an array of "refs" in a Schema: ` [{ type: Schema.Types.ObjectId, ref: '<OtherModel>' }] `


## The seed show must go on...

Update your seed script for inserting relational data:

- Adapt the purging (=removing) of all data before seeding
    - Clear all orders
    - Clear all pizzas
    - Clear all customers

- Create three pizzas 
    - either by calling `Pizza.create(...)` three times or 
    - `Pizza.insertMany([...threePizzaObjects...])`

- Add pizzas to orders:
	- customer 1 ordered ONE pizza today
	- customer 2 ordered TWO pizzas yesterday
    - remember you have to insert IDs (!) as value for a reference field
    - how to state an array of IDs: ` pizzas: [ pizzaID1, pizzaID2, ... ] `

Test if it works by starting your app and calling your seed route in the browser

## Extend the API

Re-visit server.js:

Add another GET route /pizzas

This route should return all pizzas in your database.
