import express from "express"
import "./db-connect.js" // connect to database
import Customer from "./models/Customer.js"
import Order from "./models/Order.js"
import Pizza from "./models/Pizza.js"

const app = express()

// ROUTES
app.get('/', (req, res) => {
    res.send(`<h1>Hello from Pizza API</h1>
    <p><a href="/customers">/customers</a></p>
    <p><a href="/orders">/orders</a></p>
    <p><a href="/pizzas">/pizzas</a></p>`);
});

app.get('/customers', async (req, res, next) => {
    try {
        const customers = await Customer.find()
        if (!customers) throw new Error(400, "No customers found");
        res.json(customers)
    } catch (error) {
        next(error)
    }
})

app.get('/orders', async (req, res, next) => {
    try {
        const ordersWithUsersAndPizzas = await Order.find()
        .select("-_id")
        .populate({path: 'customer', model: Customer, select: '-_id address.city'})
        .populate({path: 'items.pizza', model: Pizza, select: '-_id'})

        if (!ordersWithUsersAndPizzas) throw new Error(400, "No orders found");
        res.json(ordersWithUsersAndPizzas)
    } catch (error) {
        next(error)
    }
})


app.get('/pizzas', async (req, res, next) => {
    try {
        const pizzas = await Pizza.find()
        if (!pizzas) throw new Error(400, "No pizzas found");
        res.json(pizzas)
    } catch (error) {
        next(error)
    }
})

// GENERIC ERROR HANDLER
app.use((err, req, res, next) => {
    res.status(err.status || 500).send({
        error: {
            message: err.message
        }
    })
})

// STARTP API
const port = 5000
app.listen(port, () => {
    console.log('Server started on port ' + port + " 💪");
    console.log(`http://localhost:${port}`);
});