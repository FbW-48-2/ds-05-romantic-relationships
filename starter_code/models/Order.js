import mongoose from "mongoose"
const { Schema, model } = mongoose

const OrderSchema = new Schema({ 
    order_date: {type: Date, required: true},
    customer: {type: Schema.Types.ObjectId, ref: 'Customer'},
    pizza: [{type: Schema.Types.ObjectId, ref: 'Pizza'}]
    }, {
    versionKey: false // => __v => we dont give a shi***
  })
  
  const Order = model("Order", OrderSchema)
  
  export default Order
