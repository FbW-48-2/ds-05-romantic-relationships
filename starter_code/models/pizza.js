import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const PizzaSchema = new Schema({
    name: String,
    price: Number
},
{
    versionKey: false
});

const Pizza = model("Pizza", PizzaSchema);

export default Pizza;