import mongoose from 'mongoose';
const { Schema, model } = mongoose;

// Order Schema
const OrderSchema = new Schema({
    order_date: Date,
    customerID: { type: Schema.Types.ObjectId, ref: "Customer"},
    pizzas: [{ type: Schema.Types.ObjectId, ref: "Pizza"}] 
  }, {
    versionKey: false
  });

const Order = model("Order", OrderSchema);

export default Order;