import mongoose from "mongoose";
import "./db-connect.js";
import Customer from "./models/Customer.js";
import Order from "./models/Order.js"
import faker from 'faker'
import Pizza from "./models/Pizza.js";


(async () => {

  try {
    await Customer.deleteMany({})
    console.log(`All customers are now in a better place... Cancun`);
  }
  catch (error) {
    console.log(error);
  }

  try {
    await Order.deleteMany({})
    console.log(`All orders are now in a better place... Acapulco`);
  }
  catch (error) {
    console.log(error);
  }

  try {
    await Pizza.deleteMany({})
    console.log(`All pizzas are now in a better place... Puerto Escondido`);
  }
  catch (error) {
    console.log(error);
  }

  try {
    // seed some customers...

    const costumersData = Array(2).fill("🤪").map(()=>{
      const costumer = {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          address: {
            street: faker.address.streetName(),
            zipcode: faker.address.zipCode(),
            city: faker.address.city()
          } 
        }
      return costumer
    })

    const customersDB = await Customer.create(costumersData)

    const pizzas = [
      { name: "Margherita", price: 3.99 },
      { name: "Diavolo", price: 4.99 },
      { name: "Parma", price: 3.99 }
    ]
    const pizzasDB = await Pizza.create(pizzas)

    const orders = [
      {
        order_date: '2021-09-12',
        customer: customersDB[0],
        items: [
          {
            pizza: pizzasDB[0],
            quantity: 2
          }
        ],
      },
      {
        order_date: '2021-09-11',
        customer: customersDB[1],
        items: [
          {
            pizza: pizzasDB[2],
            quantity: 3
          },
          {
            pizza: pizzasDB[1],
            quantity: 1
          }
        ],
      }
    ]
    const ordersDB = await Order.create(orders)

    console.log("******************************************************************");
    console.log(`${customersDB.length} customers created, ${ordersDB.length} orders created, ${pizzasDB.length} pizzas created`);
    console.log("******************************************************************");

  }
  // handle errors in seeding
  catch (err) {
    console.log("[ERROR] Seeding failed: ", err)
  }

  // close connection to mongoose at end of seeding (otherwise our script will keep hanging...)
  mongoose.connection.close()

})()

