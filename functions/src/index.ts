//import * as functions from "firebase-functions";
import express from "express"
import {onRequest} from "firebase-functions/v2/https"
import {addTask, updateTask, getAllTasks, deleteTask} from './config/entryController';
const cors = require('cors');
const app = express();



app.use(cors({origin: true}))

app.get("/holaMundillo", (req, res) => res.status(200).send("por fin funciona!"));
app.get("/getAllTasks", getAllTasks);
app.post("/addTask", addTask);
app.put("/updateTask/:taskId", updateTask);
app.delete("/deleteTask/:taskId", deleteTask);

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const holaMundillo = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
//});

exports.app = onRequest(app);

