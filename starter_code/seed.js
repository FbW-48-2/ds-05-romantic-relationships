import mongoose from "mongoose";
import "./db-connect.js";
import { Customer } from "./models.js";


(async () => {    
    
  try {
    // seed some customers...

    // e.g. use insertMany to seed in an array of objects...
    // example: await Customer.insertMany([ obj1, obj2 ]
    // await insertMany will return an array of all inserted items
      
  }
  // handle errors in seeding
  catch(err) { 
      console.log("[ERROR] Seeding failed: ", err)
  }

  // close connection to mongoose at end of seeding (otherwise our script will keep hanging...)
  mongoose.connection.close()

})()

