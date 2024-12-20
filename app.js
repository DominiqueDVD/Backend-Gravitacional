// Importa Express y otros módulos necesarios
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();
mongoose.set('strictQuery', false);

// Importa el enrutador para las rutas de los posts y proyectos
const postRoutes = require("./routes/blog");
const projectRoutes = require("./routes/project");

const bodyParser = require('body-parser');

// Configuración
require("dotenv").config();
const port = process.env.PORT || 3100;

// Middleware
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(cors());
app.use(express.json());


// Rutas
app.use("/registrarse", require("./routes/registrarse"));
app.use("/login", require("./routes/login"));
// app.use("/api/user", require("./routes/user"));
app.use("/refresh-token", require("./routes/refreshToken"));
// app.use("/api/signout", require("./routes/signout"));
app.use("/blog", postRoutes);
app.use("/foro", require("./routes/foro"));
app.use("/project", require("./routes/project"));
app.use("/rhino", require("./routes/rhino"));
app.use('/layer', require('./routes/layer'));

app.get('/', (req, res) => {
    res.send('El servidor está funcionando correctamente.');
});

app.get('/healthcheck', (req, res) => {
    res.status(200).send('Status Ok. El servidor está funcionando correctamente.');
  });

// Función principal para conectar a MongoDB
const start = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log("Conectado a MongoDB");
        // console.log('Limit file size: '+limit);

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