import mongoose from "mongoose"
const { Schema, model } = mongoose

// ... Address Schema - create me here! ...
const AddressSchema = new Schema({
  street: String,
  zipcode: String,
  city: String
}, {
  _id: false
})

const CustomerSchema = new Schema({
  // ... customer schema fields go here
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: AddressSchema, required: true },
}, {
  versionKey: false
})

// named export
const Customer = model("Customer", CustomerSchema)

export default Customer

