import mongoose from "mongoose"
const { Schema, model } = mongoose

// ... Address Schema - create me here! ...

const CustomerSchema = new Schema({ 
  // ... customer schema fields go here
})

// named export
export const Customer = model("Customer", CustomerSchema)

// more models will be exported here soooon...
