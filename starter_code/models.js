const mongoose = require("mongoose")
const { Schema, model } = mongoose


// ... Address Schema - create me here! ...

const CustomerSchema = new Schema({ 
  // ... customer schema fields go here
})


const Customer = model("Customer", CustomerSchema)

module.exports = { 
  Customer 
  // more models will be exported here...
}