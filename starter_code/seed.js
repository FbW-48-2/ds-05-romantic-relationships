import mongoose from "mongoose";
import "./db-connect.js";
import Pizza from './models/Pizza.js'
import Customer from "./models/Customer.js";
import Order from "./models/Order.js";
import faker from 'faker'

(async () => {    
    
  try {
    // seed some customers...
    await Pizza.deleteMany()
    await Customer.deleteMany()
    await Order.deleteMany()

    const pizzaPromises = Array(5)
      .fill(null)
      .map(() => {
        const pizza = {
          name: `${faker.random.word()} ${faker.address.state()}`,
          price: faker.commerce.price(7.50, 15.90)
        }

        console.log(`Pizza ${pizza.name} has been created`)

        return Pizza.create(pizza)
      })

    const pizzasDB = await Promise.all(pizzaPromises)

    const customerPromises = Array(5)
      .fill(null)
      .map(() => {
        const customer = {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          address: {
            street: faker.address.streetAddress(),
            zipcode: faker.address.zipCode(),
            city: faker.address.city()
          }
        }

        console.log(`Customer ${customer.firstName} ${customer.lastName} has been created`)

        return Customer.create(customer)
      })

    const customersDB = await Promise.all(customerPromises)

    const order1 = {
      customer: customersDB[0],
      pizzas: [{
        pizza: pizzasDB[0],
        qty: 2
      }],
      order_date: '2021-09-13'
      }

    const order2 = {
      customer: customersDB[1],
      pizzas: [{
        pizza: pizzasDB[0],
        qty: 3
      },
      {
        pizza: pizzasDB[1],
        qty: 1
      }],
      order_date: '2021-09-12'
      }
    

    await Order.insertMany([order1, order2])

    
    // e.g. use insertMany to seed in an array of objects...
    // example: await Customer.insertMany([ obj1, obj2 ]
    // await insertMany will return an array of all inserted items
      
  }
  // handle errors in seeding
  catch(err) { 
      console.log("[ERROR] Seeding failed: ", err)
  }

  // close connection to mongoose at end of seeding (otherwise our script will keep hanging...)
  mongoose.connection.close()

})()

