import mongoose from "mongoose";
import "./db-connect.js";
import faker from 'faker';
import Order from "./models/Order.js";
import Customer from "./models/Customer.js"
import Pizza from "./models/Pizza.js";

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
    await Order.deleteMany({});
    await Customer.deleteMany({});
    await Pizza.deleteMany({});

    const pizzas = await Pizza.insertMany([
      {name: "Pomodoro", price: 5.99},
      {name: "Supreme", price: 7.99},
      {name: "Deluxe", price: 9.99}
    ]);

    const pizzaDb = await Pizza.create(pizzas);

    const customers = await Customer.insertMany([
      {firstname: "shinhee", 
      lastname: "chae", 
      address: {street: "Kreuzbergstr.75", zipcode: "10965", city: "Berlin"}}, 
      
      {firstname: "corey", 
      lastname: "mason", 
      address: {street: "Bergmannstr.1", zipcode: "10961", city: "Berlin"} }]);
    
    const customerDb = await Customer.create(customers);

    const orders = await Order.insertMany([
      {order_date: "2021-9-13", 
      customerInfo: customerDb[0],
      pizzas: [pizzaDb[0]]}, 

      {order_date: "2021-9-12", 
      customerInfo: customerDb[1],
      pizzas: [pizzaDb[1], pizzaDb[2]] }]);

    const orderDb = await Order.create(orders);

  
    // const customerPromises = Array(10)
    //   .fill()
    //   .map(()=>{
    //     const customerData = {
    //         firstname: faker.name.firstName(),
    //         lastname: faker.name.lastName(),
    //         address: {
    //         street: faker.address.streetAddress(),
    //         zipcode: faker.address.zipCode(),
    //         city: "Berlin"   
    //         }}
            
    //         console.log(`customer ${customerData.firstname} ${customerData.lastname} is created.`);
       
    //         const customer = new Customer(customerData);
    //         return customer.save();

    //       });

    // try {
    //     await Promise.all(customerPromises);
    //     console.log(`All data for 10 customers is stored in DB`)
    // } catch (err) {
    //     console.log(err)
    // }
    
  }
  // handle errors in seeding
  catch(err) { 
      console.log("[ERROR] Seeding failed: ", err)
  }

  // close connection to mongoose at end of seeding (otherwise our script will keep hanging...)
  mongoose.connection.close()

})();

