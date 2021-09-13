import mongoose from 'mongoose'
const { Schema, model } = mongoose;

const OrderItemSchema = new Schema({
    pizza: {
        type: Schema.Types.ObjectId,
        ref: 'Pizza'
    },
    quantity: {
        type: Number, min: 1, validate: {
            validator: Number.isInteger,
            message: "quantity is not an integer value"
        }
    },
}, {
    versionKey: false,
    _id: false
})

const OrderSchema = new Schema({
    order_date: { type: Date, required: true },
    items: [OrderItemSchema],
    pizzasId: [{
        type: Schema.Types.ObjectId,
        ref: 'Pizza'
    }]
}, {
    versionKey: false
})

const Order = model("Order", OrderSchema);

export default Order;