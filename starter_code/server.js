const express = require("express")
const mongoose = require("mongoose")
const app = express()
const { Customer } = require("./models")

require("./db-connect") // connect to database

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
  const customers = [] // please fetch the customers from your database here, por favor!
  res.json(customers) 
})

// GENERIC ERROR HANDLER
app.use((err, req, res, next) => {
    res.status(err.status || 500).send({error: {
        message: err.message
    }})    
})