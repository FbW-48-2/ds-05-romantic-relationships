import mongoose from "mongoose";
const { Schema, model } = mongoose;

// ... Address Schema - create me here! ...
const AddressSchema = new Schema({
  street: String,
  zipCode: String,
  city: String
});

const CustomerSchema = new Schema({ 
  firstName: String,
  lastName: String,
  address: { type: AddressSchema, required: true }
});

// named export
export const Customer = model("Customer", CustomerSchema);

// more models will be exported here soooon...
