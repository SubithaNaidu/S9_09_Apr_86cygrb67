require("dotenv").config()
const express = require("express")
const db = require("./db")
const app = express()
const cors = require("cors")


app.use(express.json())
app.use(cors())

const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const catRoute = require("./routes/categories")
const postRoute = require("./routes/post")
const adminRoute = require("./routes/admin")

app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/categories",catRoute)
app.use("/api/posts",postRoute)
app.use("/api/admin",adminRoute)

PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})