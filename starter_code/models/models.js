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

// Order Schema
const OrderSchema = new Schema({
  order_date: Date,
  customerID: { type: Schema.Types.ObjectId, ref: "Customer"} 
}, {
  versionKey: false
});

// named export
export const Customer = model("Customer", CustomerSchema);

// more models will be exported here soooon...
export const Order = model("Order", OrderSchema);