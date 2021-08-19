# Data Modelling - Exercise #4 - Populating refs

Now our boss told us, he wants an overview of all our orders including all pizzas and the customer information. 

He wants to have everything in ONE overview.

No problem. We know how to do that... with populating!

Populating helps us joining our "splitted data", respectively our references, together into ONE set of data. 

Advantage: The frontend does not need to piece together the data on its own. It can retrieve all data to render a page with just one call to the backend.


## Provide an overview of all orders

Adapt your GET route "/orders"

This route should return ALL orders with all sub information (not just IDs):
* Customer information
* The ordered pizzas with name & price

### BONUS - Selecting certain fields

Our boss just wants to see the "city" of each customer instead of the full customer info. 

Use the second parameter of the populate method to specify that.

Additionally he is not interested in all the _id fields. Trim off all that fields from your resultset using the inverse field selector (-)