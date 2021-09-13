import mongoose from "mongoose";
import "./db-connect.js";
import Customer from "./models/Costumer.js";
import Order from "./models/Order.js"
import faker from 'faker'


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
    console.log(`All orders are now in a better place... Cancun`);
  }
  catch (error) {
    console.log(error);
  }

  try {
    // seed some customers...

    // e.g. use insertMany to seed in an array of objects...
    // example: await Customer.insertMany([ obj1, obj2 ]
    // await insertMany will return an array of all inserted items

    const orders = [
      { order_date: '2021-09-12' },
      { order_date: '2021-09-10' }
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
    console.log(`${customersDB.length} customers created, ${ordersDB.length} orders created`);
    console.log("******************************************************************");

  }
  // handle errors in seeding
  catch (err) {
    console.log("[ERROR] Seeding failed: ", err)
  }

  // close connection to mongoose at end of seeding (otherwise our script will keep hanging...)
  mongoose.connection.close()

})()

