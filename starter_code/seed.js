import mongoose from "mongoose";
import "./db-connect.js";

import Customer from './models/Customer.js'
import Order from './models/Order.js'
import Pizza from './models/Pizza.js'


(async () => {    
  const customers = [
    {
      firstname: 'Christoph',
      lastname: 'M',
      address: {
        street: 'Hauptstraße',
        zipcode: '10437',
        city: "Berlin"
       }
    },
    {
      firstname: 'Gerda',
      lastname: 'Müller',
      address: {
        street: 'Nebenstraße',
        zipcode: '10437',
        city: "Berlin"
       }
    }
  ]

  

 
  
try {
  
  // Customers
  await Customer.deleteMany()  
  const insertCustomer = await Customer.insertMany(customers)
  console.log('Insert worked: ', insertCustomer)


 // Pizza
  await Pizza.deleteMany()

  const pizzas = [
    {
      name: 'Salami',
      price: 5},
    {
      name: "4 Käse",
      price: 6},
    {
      name: "Hawai",
      price: 4
    }
  ]
    
  const insertPizza = await Pizza.insertMany(pizzas)
  console.log('Pizza insert worked!', insertPizza)


//Orders 
  const orders =[
   {
      order_date: new Date(),
      customer: `${insertCustomer[0]._id}`,
      pizza: ["613f59c15a620092f9e9a26f"]
    },
    {
      order_date: '2021-12-09' ,
      customer: `${insertCustomer[1]._id}`,
      pizza: [`${insertPizza[0]._id}`, `${insertPizza[1]._id}`]
    }]
  
  await Order.deleteMany()
  const insertOrder = await Order.insertMany(orders)
  console.log('Orders inserted', insertOrder)
  }


  // handle errors in seeding
  catch(err) { 
      console.log("[ERROR] Seeding failed: ", err)
  }

  // close connection to mongoose at end of seeding (otherwise our script will keep hanging...)
  mongoose.connection.close()

})()

