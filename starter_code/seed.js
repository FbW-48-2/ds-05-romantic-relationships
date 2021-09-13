import mongoose from "mongoose";
import "./db-connect.js";
import { Customer } from "./models.js";
import faker from 'faker';

(async function () {    
  mongoose.connect("mongodb://localhost/pizza_db", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
  })
  .then(()=> console.log(`DB's up & running, Shinhee!`))
  .catch((err)=> {
      console.log(`connection failed`, err)
  })

  try {
    await Customer.deleteMany({});
    // await Customer.insertMany([{firstname: "corey", lastname: "chae", address: {street: "Kreuzbergstr.77", zipcode: "10965", city: "Berlin"}  }, { firstname: "shinhee", lastname: "chae", address: {street: "Bergmannstr.1", zipcode: "10961", city: "Berlin"}  }])
    
    const customerPromises = Array(10)
      .fill()
      .map(()=>{
        const customerData = {
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            address: {
            street: faker.address.streetAddress(),
            zipcode: faker.address.zipCode(),
            city: "Berlin"   
            }}
            
            console.log(`customer ${customerData.firstname} ${customerData.lastname} is created.`);
       
            const customer = new Customer(customerData);
            return customer.save();

          });

    try {
        await Promise.all(customerPromises);
        console.log(`All data for 10 customers is stored in DB`)
    } catch (err) {
        console.log(err)
    }
    
  }
  // handle errors in seeding
  catch(err) { 
      console.log("[ERROR] Seeding failed: ", err)
  }

  // close connection to mongoose at end of seeding (otherwise our script will keep hanging...)
  mongoose.connection.close()

})();

