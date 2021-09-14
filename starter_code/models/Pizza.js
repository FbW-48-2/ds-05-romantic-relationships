import mongoose from 'mongoose'
const { Schema, model } = mongoose;

const PizzaSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true }
}, {
    versionKey: false
})

const Pizza = model("Pizza", PizzaSchema)

export default Pizza