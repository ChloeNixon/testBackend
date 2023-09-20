const express = require('express')
const app = express()
const mongoose = require('mongoose')
const routes = require('./routes') // includes the routes.js file
const cors = require('cors') // includes cors module

DATABASE_URL="mongodb+srv://chloe:123mongodb@cluster0.i3ac5se.mongodb.net/?retryWrites=true&w=majority";
const PORT = 5200

app.use(cors()) // We're telling express to use CORS
app.use(express.json()) // we need to tell server to use json as well
app.use(routes) // tells the server to use the routes in routes.js


mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('database connected'))

app.listen(PORT, () => {
    console.log("The API is running...")
})