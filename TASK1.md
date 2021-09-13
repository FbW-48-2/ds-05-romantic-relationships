# Data Modelling - Exercise #1 - Schema nesting

In this exercise we want to train document nesting in a schema.

## Task: Provide a customer schema

First run `npm install` in this folder. It will install all needed dependencies for the exercise.

Find the given file "models.js"
    
    * Adapt the customer schema to have these fields: 
        * firstname, lastname, address

    * The address should be a subschema, consisting of these fields:
        * street, zipcode, city 
        * (please use String as datatype for the zipCode, because zipcodes can include dashes or letters in some regions)

    * Embedd the customer address in the customer schema
        * embedding a schema in another schema: `address: AddressSchema`
            * please do NOT create a model for your Address Schema!
            * why? models we only use if we wanna store items in an own Mongo collection
            * but the address we only want to EMBED inside a customer. So no need for a model / own collection
    
    * Create a Customer model and attach your customer schema to it

## Configure the MongoDB connection

Adapt the mongoose connection string in file "db-connect.js"
- please state the connection string to your personal MongoDB cluster on ATLAS
- if you have MongoDB installed locally, you can keep the connection string to seed into your local DB
- remember: you do NOT need to create the database "pizza_db" manually
    - on first data insertion, MongoDB will create the database automatically! 


## Seed it, baby

Now we wanna feed our pizza_db with some initial data.

Therefore we wanna create - or "seed" (like we say in the DB world) - some customers.

Find already a skeleton seed script in the file "seed.js".

Adapt the seed script:
- insert two customers hardcoded `Customer.insertMany([ { ...customerObject1... }, { ...customerObject2... }  ])`
    - (or advanced version - create the customer data with faker :))
- give some console.log about the successful seeding of 2 customers

Test your seed script
- run 'npm run seed' in the terminal

Check if the customer data was correctly seed by looking up your database in Compass.


## Build a mini API

Now we wanna provide our customers on a route /customers

Find already an API skeleton in the file "server.js"

Adapt the /customers route to fetch your seeded customers from MongoDB
(You do not need to outsource the logic to controllers here. Keep it simple...)

Check if the customers were inserted correctly:
- start your server with `nodemon server.js`
- open http://localhost:5000/customers and check if you get the customer data


## BONUS

Seeding works? Nice!

Add purging of all customers before you seed data
- At the beginning of your seed route: Clear all your customers using the `Customer.deleteMany()` function
- This way you prevent adding the same customers over and over again
- deleteMany is a promise. So please wait for it to finish first, before you create your new data ;)

Shipping to a customer without an address makes no sense?? You're right!
- Make the address required: `{ type: AddressSchema, required: true }`

