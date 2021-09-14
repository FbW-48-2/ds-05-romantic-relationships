import mongoose from 'mongoose';
const { Schema, model } = mongoose;

// OrderItem Schema
const OrderItemSchema = new Schema({
  pizza: { type: Schema.Types.ObjectId, ref: "Pizza"},
  quantity: Number
}, {
  versionKey: false,
  _id: false
})

// Order Schema
const OrderSchema = new Schema({
    order_date: Date,
    customerID: { type: Schema.Types.ObjectId, ref: "Customer"},
    items: [ OrderItemSchema ]
  }, {
    versionKey: false
  });

const Order = model("Order", OrderSchema);

export default Order;