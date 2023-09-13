# ToDo App

Proyecto backend de lista de tareas para Atom

Este proyecto de Firebase Functions contiene funciones que gestionan tareas. Las funciones se implementan utilizando Firebase Functions y una base de datos Firestore para almacenar y administrar tareas.

## Índice

- [Funciones Disponibles](#funciones-disponibles)
- [Configuración y Uso](#configuración-y-uso)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)


## Funciones Disponibles

El proyecto incluye las siguientes funciones:

### Agregar una Nueva Tarea

Endpoint: `POST /addTask`

Esta función permite agregar una nueva tarea a la base de datos.

### Obtener Todas las Tareas

Endpoint: `GET /getAllTasks`

Esta función devuelve todas las tareas almacenadas en la base de datos.

### Actualizar una Tarea

Endpoint: `PUT /updateTask/:taskId`

Esta función permite actualizar una tarea existente en la base de datos.

### Eliminar una Tarea

Endpoint: `DELETE /deleteTask/:taskId`

Esta función permite eliminar una tarea de la base de datos.

## Configuración y Uso

Asegúrate de seguir estos pasos para configurar y usar este proyecto:

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias.
3. Configura las credenciales de Firebase siguiendo la documentación oficial de Firebase.
4. Implementa el proyecto en Firebase
5. Las funciones estarán disponibles en las URL correspondientes mencionadas anteriormente.
```bash
git clone https://github.com/Me-Hernandez2/AtomChallengeBack.git
cd  AtomChallengeBack
git checkout develop
git pull
npm install
firebase deploy
```

## Tecnologías Utilizadas

Este proyecto utiliza las siguientes tecnologías principales:

- Firebase Functions
- Firebase Firestore (Base de datos)
- Express (Para la creación de API)
- TypeScript (Lenguaje de programación)
- CORS (Para permitir solicitudes de origen cruzado)

