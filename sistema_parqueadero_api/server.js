const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const port = 3000;

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", 'https://www.gstatic.com', "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", 'data:', 'https://www.gstatic.com'],
        }
    }
}));

app.use(cors());
app.use(express.json());
app.use(express.text({ type: 'application/xml' }));

// Sirve archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Crear la carpeta 'reservas' si no existe
const reservasDir = path.join(__dirname, 'reservas');
if (!fs.existsSync(reservasDir)) {
    fs.mkdirSync(reservasDir);
}

// Ruta para la raíz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint para manejar JSON
app.post('/api/reservas/json', (req, res) => {
    console.log('Datos JSON recibidos:', req.body);
    const data = req.body;
    const filePath = path.join(reservasDir, 'reserva.json');
    
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error('Error al guardar reserva JSON:', err);
            res.status(500).send('Error al guardar reserva JSON');
        } else {
            res.status(200).json({ message: 'Reserva JSON guardada exitosamente' });
        }
    });
});

// Endpoint para manejar XML
app.post('/api/reservas/xml', (req, res) => {
    console.log('Datos XML recibidos:', req.body);
    const xmlData = req.body;
    const filePath = path.join(reservasDir, 'reserva.xml');

    fs.writeFile(filePath, xmlData, (err) => {
        if (err) {
            console.error('Error al guardar reserva XML:', err);
            res.status(500).send('Error al guardar reserva XML');
        } else {
            res.status(200).send('Reserva XML guardada exitosamente');
        }
    });
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});


// const express = require('express');
// const path = require('path'); // Importa el módulo 'path'
// const app = express();
// const port = 3000;
// const cors = require('cors');
// const helmet = require('helmet');
// const fs = require('fs');
// const reservasDir = path.join(__dirname, 'reservas');
// if (!fs.existsSync(reservasDir)) {
//     fs.mkdirSync(reservasDir);
// }

// app.use(helmet({
//     contentSecurityPolicy: {
//         directives: {
//             defaultSrc: ["'self'"],
//             styleSrc: ["'self'", 'https://www.gstatic.com', "'unsafe-inline'"],
//             scriptSrc: ["'self'", "'unsafe-inline'"], // Permite scripts en línea (aunque es menos seguro)
//             imgSrc: ["'self'", 'data:', 'https://www.gstatic.com'],
//         }
//     }
// }));


// app.use(cors());
// app.use(express.json());
// app.use(express.text({ type: 'application/xml' }));

// // Sirve archivos estáticos
// app.use(express.static(path.join(__dirname, 'public'))); // Usando el directorio actual

// // Endpoints para manejar JSON y XML
// app.post('/api/reservas/json', (req, res) => {
//     console.log('Datos JSON recibidos:', req.body);
//     const data = req.body;
//     const filePath = path.join(reservasDir, 'reserva.json'); // Usar `reservasDir`

//     fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
//         if (err) {
//             console.error('Error al guardar reserva JSON:', err);
//             res.status(500).send('Error al guardar reserva JSON');
//         } else {
//             console.log('Archivo JSON guardado en:', filePath);
//             res.status(200).json({ message: 'Reserva JSON guardada exitosamente' });
//         }
//     });
// });

// app.post('/api/reservas/xml', (req, res) => {
//     console.log('Datos XML recibidos:', req.body);
//     const xmlData = req.body;
//     const filePath = path.join(reservasDir, 'reserva.xml'); // Usar `reservasDir`

//     fs.writeFile(filePath, xmlData, (err) => {
//         if (err) {
//             console.error('Error al guardar reserva XML:', err);
//             res.status(500).send('Error al guardar reserva XML');
//         } else {
//             console.log('Archivo XML guardado en:', filePath);
//             res.status(200).send('Reserva XML guardada exitosamente');
//         }
//     });
// });


// // Inicia el servidor
// app.listen(port, () => {
//     console.log(`Servidor corriendo en http://localhost:${port}`);
// });

