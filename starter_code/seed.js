import mongoose from "mongoose";
import "./db-connect.js";
import { Customer } from "./models.js";
import faker from 'faker'


(async () => {

  try {
    await Customer.deleteMany({})
    console.log(`All customers are now in a better place... Cancun`);
  }
  catch (error) {
    console.log(error);
  }

  const costumerPromises = Array(10).fill("🤪").map(() => {
    const costumerData = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      address: {
        street: faker.address.streetName(),
        zipcode: faker.address.zipCode(),
        city: faker.address.city()
      }
    }
    const costumer = new Customer(costumerData)
    return costumer.save()
  })


  try {
    // seed some customers...

    // e.g. use insertMany to seed in an array of objects...
    // example: await Customer.insertMany([ obj1, obj2 ]
    // await insertMany will return an array of all inserted items

    // sorry Rob, I like faker 😅
    await Promise.all(costumerPromises);
    console.log("******************************************************************");
    console.log("New 10 costumers were created");
    console.log("******************************************************************");

  }
  // handle errors in seeding
  catch (err) {
    console.log("[ERROR] Seeding failed: ", err)
  }

  // close connection to mongoose at end of seeding (otherwise our script will keep hanging...)
  mongoose.connection.close()

})()

