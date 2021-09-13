import mongoose from "mongoose"
const { Schema, model } = mongoose

const AddressSchema = new Schema(
  {
    street: String,
    city: String,
    zipcode: String,
  },
  { _id: false }
);

const CustomerSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    address: { type: AddressSchema, required: true },
  },
  { versionKey: false }
);

// named export
const Customer = model("Customer", CustomerSchema);

export default Customer;