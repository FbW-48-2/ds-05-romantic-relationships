import mongoose from "mongoose";
import "./db-connect.js";
import Customer from "./models/Costumer.js";
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
    const pizzas = [
      { name: "Margherita", price: 3.99 },
      { name: "Diavolo", price: 4.99 },
      { name: "Parma", price: 3.99 }
    ]
    const pizzasDB = await Pizza.create(pizzas)

    const orders = [
      {
        order_date: '2021-09-12',
        items: [
          {
            pizza: pizzasDB[0],
            quantity: 2
          }
        ],
        pizzasId: [pizzasDB[0]]
      },
      {
        order_date: '2021-09-11',
        items: [
          {
            pizza: pizzasDB[2],
            quantity: 3
          }
        ],
        pizzasId: [pizzasDB[1], pizzasDB[2]]
      }
    ]
    const ordersDB = await Order.create(orders)


    const costumersData = [
      {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        address: {
          street: faker.address.streetName(),
          zipcode: faker.address.zipCode(),
          city: faker.address.city()
        },
        orderId: ordersDB[0]
      },
      {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        address: {
          street: faker.address.streetName(),
          zipcode: faker.address.zipCode(),
          city: faker.address.city()
        },
        orderId: ordersDB[1]
      }
    ]
    const customersDB = await Customer.create(costumersData)

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

