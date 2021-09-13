import mongoose from "mongoose";
import faker from "faker";
import "./db-connect.js";
import Customer from "./models/customer.js";
import Order from "./models/order.js";
import Pizza from "./models/pizza.js";


(async () => {
  try {
    await Customer.deleteMany({});
    await Order.deleteMany({});
    await Pizza.deleteMany({});

    const customers = [];

    for (let i = 0; i < 2; i++) {
      const customer = new Customer({
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        address: {
          street: faker.address.streetName(),
          city: faker.address.city(),
          zipcode: faker.address.zipCode(),
        },
      });
      customers.push(customer);
    }

  
    const customerDb = await Customer.create(customers);
  
    

    const pizzas = [
      { name: "Contadina", price: 10 },
      { name: "Pepperoni", price: 12 },
      { name: "Tonno", price: 11 },
    ];

    
    const pizzaDb = await Pizza.create(pizzas);
   
  
    const orders = [
      { date: 2021-9-13, customer: customerDb[0], pizzas: [{pizza : pizzaDb[0], quantity: 2}] },
      { date: 2021-9-12, customer: customerDb[1], pizzas: [{pizza : pizzaDb[1], quantity: 1}, {pizza : pizzaDb[2], quantity: 1}]},
    ];

    const orderDb = await Order.create(orders);

    console.log('seeded yey')
    

  } catch (err) {
    // handle errors in seeding
    console.log("[ERROR] Seeding failed: ", err);
  }

  mongoose.connection.close();
})();

