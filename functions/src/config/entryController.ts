import { Response } from "express";
import * as admin from 'firebase-admin';

// Carga las credenciales desde un archivo JSON
const serviceAccount = require("../../permisos.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();
const errorMsj = 'Oops! algo salió mal con tu petición';

// Define el tipo de objeto de tarea
type TaskType = {
  title: string,
  description: string,
  status: boolean
}

// Define el tipo de objeto de solicitud
type Request = {
  body: TaskType,
  params: { taskId: string }
}

/**
 * Agrega una nueva tarea.
 * @param req La solicitud HTTP que contiene los datos de la tarea.
 * @param res La respuesta HTTP que se enviará al cliente.
 */
const addTask = async (req: Request, res: Response) => {
  const { title, description, status } = req.body;
  try {
    const task = db.collection("tasks").doc();
    const taskObject = {
      id: task.id,
      title,
      description,
      status
    };

    // Guarda la tarea en la base de datos
    await task.set(taskObject);

    res.status(200).send({
      status: "success",
      message: "Tarea creada satisfactoriamente",
      data: taskObject,
    });
  } catch (error) {
    res.status(500).json(errorMsj);
  }
};

/**
 * Obtiene todas las tareas almacenadas.
 * @param req La solicitud HTTP.
 * @param res La respuesta HTTP que contendrá las tareas.
 */
const getAllTasks = async (req: Request, res: Response) => {
  try {
    const allEntries = await db.collection("tasks").get()
    const tasks = allEntries.docs.map((doc) => doc.data());

    return res.status(200).json({
      status: "success",
      message: "Tareas consultadas satisfactoriamente",
      data: tasks,
    });
  } catch (error) {
    return res.status(500).json(errorMsj);
  }
}

/**
 * Actualiza una tarea existente.
 * @param req La solicitud HTTP que contiene los datos de la tarea actualizada.
 * @param res La respuesta HTTP que se enviará al cliente.
 */
const updateTask = async (req: Request, res: Response) => {
  const { body: { title, description, status }, params: { taskId } } = req;

  try {
    const task = db.collection("tasks").doc(taskId);
    const currentData = (await task.get()).data() || {};
    // Asegurarse de que status no sea undefined ni null
    const updatedStatus = typeof status !== "undefined" ? status : currentData.status;
    const taskObject = {
      title: title || currentData.title,
      description: description || currentData.text,
      status: updatedStatus,
      id: taskId || currentData.id
    };

    // Actualiza la tarea en la base de datos
    await task.set(taskObject);

    return res.status(200).json({
      status: "success",
      message: "Tarea editada satisfactoriamente",
      data: taskObject,
    });
  } catch (error) {
    return res.status(500).json(errorMsj);
  }
};

/**
 * Elimina una tarea existente.
 * @param req La solicitud HTTP que contiene el identificador de la tarea a eliminar.
 * @param res La respuesta HTTP que se enviará al cliente.
 */
const deleteTask = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  try {
    const task = db.collection("tasks").doc(taskId);

    // Elimina la tarea de la base de datos
    await task.delete();

    return res.status(200).json({
      status: "success",
      message: "Tarea eliminada satisfactoriamente",
    });
  } catch (error) {
    return res.status(500).json(errorMsj);
  }
};

export { addTask, getAllTasks, updateTask, deleteTask };
