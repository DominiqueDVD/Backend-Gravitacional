// Importa Express y otros módulos necesarios
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();
mongoose.set('strictQuery', false);

// Importa el enrutador para las rutas de los posts y proyectos
const postRoutes = require("./routes/blog");
const projectRoutes = require("./routes/project");

// Configuración
require("dotenv").config();
const port = process.env.PORT || 3100;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/registrarse", require("./routes/registrarse"));
app.use("/api/login", require("./routes/login"));
app.use("/api/user", require("./routes/user"));
app.use("/api/refresh-token", require("./routes/refreshToken"));
app.use("/api/signout", require("./routes/signout"));
app.use("/api/blog", postRoutes);
app.use("/api/foro", require("./routes/foro"));
app.use("/api/project", projectRoutes);  // Agregar esta línea



// Función principal para conectar a MongoDB
const start = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log("Conectado a MongoDB");

        // Inicia el servidor
        app.listen(port, () => {
            console.log(`El servidor está en ejecución en el puerto: ${port}`);
        });
    } catch (e) {
        console.log(e.message);
    }
}
// start.catch(console.error);

start();