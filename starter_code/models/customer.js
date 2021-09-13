import mongoose from "mongoose";
const { Schema, model } = mongoose;

// ... Address Schema - create me here! ...
const AddressSchema = new Schema({
  street: String,
  zipCode: String,
  city: String
}, {
  versionKey: false,
  _id: false
});

const CustomerSchema = new Schema({ 
  firstName: String,
  lastName: String,
  address: { type: AddressSchema, required: true }
}, {
  versionKey: false
});

const Customer = model("Customer", CustomerSchema);

export default Customer;