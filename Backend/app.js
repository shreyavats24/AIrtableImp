const express = require("express");
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const AuthRoutes = require("./routes/AuthRoutes");
const TaskRoutes = require("./routes/tasksRoutes");
app.use(express.json());
app.use(AuthRoutes);
app.use(TaskRoutes);
app.listen(PORT,(err)=>{
    if(err)
        console.log("Server is not connected!!");
    else 
        console.log(`Server is connected at ${PORT}`)
})

module.exports = app;