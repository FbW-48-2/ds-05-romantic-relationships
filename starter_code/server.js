import express from "express"
import mongoose from "mongoose"
import "./db-connect.js" // connect to database

import Customer from './models/Customer.js'
import Order from './models/Order.js'
import Pizza from './models/Pizza.js'

const app = express()


// STARTP API
const port = 5000
app.listen(port, () => {
    console.log('Server started on port ' + port);
});

// ROUTES
app.get('/', (req, res) => {
    res.send("<h1>Hello from Pizza API</h1>");
});

app.get('/customers', async (req, res) => {
  const customers = await Customer.find() // please fetch the customers from your database here, por favor!
  res.json(customers) 
})

app.get('/orders', async (req, res) => {
    const orders = await Order.find() 
    res.json(orders) 
})

app.get('/pizzas', async (req, res) => {
    const pizzas = await Pizza.find() 
    res.json(pizzas) 
})

app.get("/overview", async (req, res) => {
    const ordersAll = await Order.find()
      .populate({path: "customer", select: "address.city -_id"}).populate({path: "pizza", select: "-_id"}) // => look up that userId from users collection and replace ID by user document
  
    res.json( ordersAll )
  })


// GENERIC ERROR HANDLER
app.use((err, req, res, next) => {
    res.status(err.status || 500).send({error: {
        message: err.message
    }})    
})