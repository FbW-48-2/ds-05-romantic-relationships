import mongoose from "mongoose"
const { Schema, model } = mongoose

const OrderItemSchema = new Schema({
  pizza: { type: Schema.Types.ObjectId, ref: 'Pizza'},
  qty: { type: Number, default: 1}
},
{
  versionKey: false,
  _id: false
})


const OrderSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'Customer'},
  pizzas: [{
    type: OrderItemSchema
  }],
  order_date: { type: Date }
},
{
  versionKey: false
})

const Order = model('Order', OrderSchema)

export default Order