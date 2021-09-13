import express from "express"
import mongoose from "mongoose"
import "./db-connect.js" // connect to database
import Customer from "./models/customer.js";
import Order from "./models/order.js";
import Pizza from "./models/pizza.js";

const app = express()




// ROUTES
app.get('/', (req, res) => {
    res.send("<h1>Hello from Pizza API</h1>");
});

app.get("/customers", async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
});

app.get("/orders", async (req, res) => {
  const orders = await Order.find()
    // .populate({ path : "customer", select: "city"})
    .populate({path : "customer", select: "address.city -_id"})
    .populate({path : "pizzas", select: "-_id"})
    .populate({path : "pizzas.pizza", select: "-_id"})
  res.json(orders);
});

app.get("/pizzas", async (req, res) => {
    const pizza = await Pizza.find();
    res.json(pizza);
  });

// STARTP API
const port = 5000
app.listen(port, () => {
    console.log('Server started on port ' + port);
});

// GENERIC ERROR HANDLER
app.use((err, req, res, next) => {
    res.status(err.status || 500).send({error: {
        message: err.message
    }})    
})


