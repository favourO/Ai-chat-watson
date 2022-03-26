const express = require("express");
const app = express();
require('dotenv').config();

// 1.1 allow parsing on request bodies
app.use(express.json())

// 2. Import routes for api
const watsonRoutes = require("./routes/api/watson")
// Direct request to /api/watson routes

app.use("/api/watson", watsonRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})