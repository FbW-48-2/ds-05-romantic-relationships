import mongoose from "mongoose"
const { Schema, model } = mongoose


const AddressSchema = new Schema({
  street: {type: String, required: true},
  zipcode: {type: String, required: true},
  city: {type: String, required: true}
})

const CustomerSchema = new Schema({
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  address: {type: AddressSchema, required: true}
}, {versionKey: false, timestamps: true})



// named export
export const Customer = model("Customer", CustomerSchema)

// more models will be exported here soooon...
