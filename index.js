require('dotenv').config();

const express = require("express");
const app = express();
const port = process.env.PORT;
const morgan = require("morgan");
const wrong = require("./404.js");
const allRoutes = require("./router/allRoutes")

app.use(express.json());
app.use(morgan("dev"));
app.use(allRoutes);
app.use(wrong.notFound)
app.use(wrong.Internal)


app.listen(port,()=>{
    console.log(`Todo app is listening in ${port}`);
})