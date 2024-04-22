// Importa Express y otros módulos necesarios
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();

// Importa el enrutador para las rutas de los posts
const postRoutes = require("./routes/blog");

// Configuración
require("dotenv").config();
const port = process.env.PORT || 3100;

// Middleware


// Función principal para conectar a MongoDB
async function main(){
   await mongoose.connect(process.env.DB_CONNECTION_STRING);
   console.log("Conectado a MongoDB");
}
main().catch(console.error);

// Rutas
app.use(cors());
app.use(express.json());
app.use("/api/registrarse", require("./routes/registrarse"));
app.use("/api/login", require("./routes/login"));
app.use("/api/user", require("./routes/user"));
app.use("/api/refresh-token", require("./routes/refreshToken"));
app.use("/api/signout", require("./routes/signout"));
app.use("/api/blog", postRoutes);
app.use("/api/foro", require("./routes/foro"));


// Inicia el servidor
app.listen(port, () => {
    console.log(`El servidor está en ejecución en el puerto: ${port}`);
});
