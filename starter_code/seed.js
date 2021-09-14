import mongoose from "mongoose";
import faker from "faker";
import "./db-connect.js";
import Customer from "./models/customer.js";
import Order from "./models/order.js";
import Pizza from "./models/pizza.js";

(async () => {    
  // Clear Customers
  try {
    await Customer.deleteMany( {} );
    console.log("All customers have been deleted");
  } catch (error) {
    console.log( error );
  };
  
  // Clear Orders
  try {
    await Order.deleteMany( {} );
    console.log("All orders have been deleted");
  } catch (error) {
    console.log( error );
  };

  // Clear Pizzas
  try {
    await Pizza.deleteMany( {} );
    console.log("All pizzas have been deleted");
  } catch (error) {
    console.log( error );
  };


  // Create some customers with Faker API
  const customerPromises = Array(2)
  .fill(null)
  .map(() => {
    const customerData = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      address: {
        street: faker.address.streetName() + " " + faker.address.streetSuffix(),
        zipCode: faker.address.zipCode(),
        city: faker.address.city()
      }
    }
    console.log(`Customer ${customerData.firstName} ${customerData.lastName} added to the database`);

    const customer = new Customer( customerData );
    return customer.save();
  });

  let customers = [];

  try {
    // seed some customers...
    customers = await Promise.all( customerPromises );
    console.log("----------------------------------------------");
    console.log(`All customers have been stored to the DB`);
    console.log("----------------------------------------------");
  }
  // handle errors in seeding
  catch(err) { 
      console.log("[ERROR] Seeding failed: ", err)
  };
  // --------------------------------------------------------------

  const pizzaPromises = Array(3)
  .fill(null)
  .map(() => {
    const pizzaData = {
      name: faker.random.words(),
      price: faker.commerce.price(6, 10, 2)
    };
    console.log(`${pizzaData.name} pizza added to the database`);

    const pizza = new Pizza( pizzaData );
    return pizza.save();
  });

  let pizzas = [];

  try {
    // seed some customers...
    pizzas = await Promise.all( pizzaPromises );
    console.log("----------------------------------------------");
    console.log(`All pizzas have been stored to the DB`);
    console.log("----------------------------------------------");
  }
  // handle errors in seeding
  catch(err) { 
      console.log("[ERROR] Seeding failed: ", err)
  };
  // --------------------------------------------------------------


  const orderPromises = Array(2)
  .fill(null)
  .map(() => {
    const orderData = {
      order_date: faker.date.between("2021-09-11", "2021-09-13"),
      customerID: faker.random.arrayElement( customers ),
      pizzas: faker.random.arrayElement( pizzas )
    };
    console.log(`Order from ${orderData.order_date} added to the database`);

    const order = new Order( orderData );
    return order.save();
  });

  try {
    // seed some orders...
    await Promise.all( orderPromises );
    console.log("----------------------------------------------");
    console.log(`All orders have been stored to the DB`);
    console.log("----------------------------------------------");
  }
  // handle errors in seeding
  catch(err) { 
      console.log("[ERROR] Seeding failed: ", err)
  };

  // close connection to mongoose at end of seeding (otherwise our script will keep hanging...)
  mongoose.connection.close()

})()

