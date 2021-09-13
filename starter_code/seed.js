import mongoose from "mongoose";
import faker from "faker";
import "./db-connect.js";
import { Customer } from "./models.js";


(async () => {    
  try {
    await Customer.deleteMany( {} );
    console.log("All customers have been deleted");
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

  try {
    // seed some customers...
    // e.g. use insertMany to seed in an array of objects...
    // example: await Customer.insertMany([ obj1, obj2 ]
    // await insertMany will return an array of all inserted items
    await Promise.all( customerPromises );
    console.log("----------------------------------------------");
    console.log(`All customers have been stored to the DB`);
    console.log("----------------------------------------------");
  }
  // handle errors in seeding
  catch(err) { 
      console.log("[ERROR] Seeding failed: ", err)
  }

  // close connection to mongoose at end of seeding (otherwise our script will keep hanging...)
  mongoose.connection.close()

})()

