import mongoose from 'mongoose'
const { Schema, model } = mongoose


const PizzaSchema = new Schema({
  name: { type: String, require: true },
  price: { type: String, require: true }
},
{
  versionKey: false
})

const Pizza = model('Pizza', PizzaSchema)

export default Pizza