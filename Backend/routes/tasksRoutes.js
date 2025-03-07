const taskController = require("../controllers/taskController");
const AuthController = require("../controllers/AuthController.js");

const express = require("express");
const taskRouter = express.Router();

taskRouter.post('/addNewTask',taskController.addNewTask);
taskRouter.post('/deleteTask',taskController.deleteTask);
taskRouter.get('/getAllTasks',AuthController.specificUserTask);
taskRouter.put('/updateTask',taskController.updateTask);
module.exports=taskRouter;
