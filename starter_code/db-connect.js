const mongoose = require("mongoose")

// ESTABLISH DB CONNECTION
mongoose.connect("mongodb://localhost/pizza_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false, 
})
.then(() => console.log("DB Connection established"))
.catch((err) => console.log("[ERROR] DB Connection failed", err))

