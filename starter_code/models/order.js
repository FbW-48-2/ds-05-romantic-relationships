import mongoose from "mongoose"
const { Schema, model } = mongoose

const OrderItemSchema = new Schema({
  pizza : {type: Schema.Types.ObjectId, ref: "Pizza"},
  quantity: {type: Number, required: true, min: 1}
}, {
  _id: false
})

const OrderSchema = new Schema(
    {
      date: { type: Date },
      customer: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
      pizzas: [OrderItemSchema]
    },
    { versionKey: false }
  );
  
const Order = model("Order", OrderSchema);

export default Order;