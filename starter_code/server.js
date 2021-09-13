import express from "express"
import "./db-connect.js" // connect to database
import Customer from "./models/Customer.js";
import Order from "./models/Order.js";
import Pizza from "./models/Pizza.js";

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
  const customers = await Customer.find()
  res.json(customers) 
})

app.get('/orders', async (req, res) => {
  const orders = await Order.find({}, '-_id').populate('pizzas.pizza', '-_id').populate('customer', '-_id address.city')
//   const orders = await Order.find().populate('pizzas.pizza').select('-_id')
  res.json( orders )
})

app.get('/pizzas', async (req, res) => {
  const pizzas = await Pizza.find()
  res.json( pizzas )
})

// GENERIC ERROR HANDLER
app.use((err, req, res, next) => {
    res.status(err.status || 500).send({error: {
        message: err.message
    }})    
})