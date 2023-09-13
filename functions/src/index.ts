//import * as functions from "firebase-functions";
import express from "express"
import {onRequest} from "firebase-functions/v2/https"
import {addTask, updateTask, getAllTasks, deleteTask} from './config/entryController';
const cors = require('cors');
const app = express();

app.use(cors({origin: true}))

app.get("/getAllTasks", getAllTasks);
app.post("/addTask", addTask);
app.put("/updateTask/:taskId", updateTask);
app.delete("/deleteTask/:taskId", deleteTask);


exports.app = onRequest(app);

