const express = require('express')
const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname, './public')))




const PORT = process.env.PORT || 4004
app.use(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})