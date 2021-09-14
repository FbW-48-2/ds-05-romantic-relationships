import mongoose from "mongoose"
const { Schema, model } = mongoose

// ... Address Schema - create me here! ...
const AddressSchema = new Schema({
  street: {type: String},
  zipcode: {type: String},
  city: {type: String}
}, {
  _id: false // => do not create IDs for nested contact info
})

const CustomerSchema = new Schema({ 
  firstname: {type: String, required: true},
  lastname: {type: String},
  address: {type: AddressSchema, required: true}
}, {
  versionKey: false // => __v => we dont give a shi***
})

// named export

const Customer = model("Customer", CustomerSchema)

export default Customer 