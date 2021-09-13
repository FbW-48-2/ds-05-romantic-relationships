import mongoose from 'mongoose'
const { Schema, model } = mongoose;

const OrderSchema = new Schema({
    order_date: { type: Date, required: true }
}, {
    versionKey: false
})

const Order = model("Order", OrderSchema);

export default Order;