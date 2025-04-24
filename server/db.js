const mongoose = require("mongoose")
MONGO_URI = process.env.MONGO_URI
module.exports =mongoose.connect(MONGO_URI)
                        .then(()=>console.log("Connected to the database"))
                        .catch((err)=>console.log(err))