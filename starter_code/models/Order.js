import mongoose from "mongoose"
const { Schema, model } = mongoose


const OrderItemSchema = new Schema({
  pizza: {type: Schema.Types.ObjectId, ref: 'Pizza'},
  quantity: {type: Number}
}, {
  _id: false // => do not create IDs for nested contact info
})


const OrderSchema = new Schema({ 
    order_date: {type: Date, required: true},
    customer: {type: Schema.Types.ObjectId, ref: 'Customer'},
    // pizza: [{type: Schema.Types.ObjectId, ref: 'Pizza'}]
    item: [{type: OrderItemSchema}]
    }, {
    versionKey: false // => __v => we dont give a shi***
  })
  
  const Order = model("Order", OrderSchema)
  
  export default Order
