# Data Modelling - Exercise #5 - Order quantities

Maybe a customer wants e.g. to order one Pizza Funghi and 2 x Pizza Hawaii.

Now we need to be able to store the quantity of each ordered pizza. 

We want to update our schema to provide a quantity per ordered item.

Therefore we need some change to our data model. A new "OrderItem" schema, which holds the ordered pizza and the additional quantity field.

## Task: Add OrderItems with quantity

* Create a OrderItem schema
    * Each OrderItem should REFERENCE a pizza item
    * Each OrderItem has a quantity (e.g. 3 x Pizza Funghi)
    * Please keep the convention to add "Schema" to the name of the variable
        * `const OrderItemSchema = new Schema({...})` 
    * Please do NOT create a OrderItem model!
        * So omit this here: ` const OrderItem = model('OrderItem', OrderItemSchema)`
        * Why? We do not want to store order items in a separate collection in MongoDB
        * We want to EMBED OrderItems inside the order schema

* Nest your OrderItem schema inside your Order schema
    * Replace your current reference to the Pizza schema with the OrderItem schema:
        * ` OrderSchema { items: [OrderItemSchema] } `

* Desired end result for an order stored in MongoDB:
    ```
        order: {
            customer: xyz,
            items: [
                { pizza: <ID-of-Pizza1>, quantity: X }
                { pizza: <ID-of-Pizza2>, quantity: Y }
            ]
        }
    ```

* Update your seed script:

    * Customer 1 orders his pizza with a quantity of 2
    * Customer 2 orders one pizza with a quantity of 3
    * Test if it works by starting your app and calling your seed route in the browser 

* Update your /orders route
    * Populate now the pizza in an OrderItem
    * You can populate refs that are nested in an object or array like this: `populate("yourArr.refField)"`
