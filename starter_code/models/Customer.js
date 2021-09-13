import mongoose from "mongoose"
const { Schema, model } = mongoose

// ... Address Schema - create me here! ...
const AddressSchema = new Schema({
  street: String,
  zipcode: String,
  city: String
},
{
  versionKey: false
})

const CustomerSchema = new Schema({ 
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  address: { type: AddressSchema, require: true }
},
{
  versionKey: false
})

// named export
const Customer = model("Customer", CustomerSchema)

export default Customer
