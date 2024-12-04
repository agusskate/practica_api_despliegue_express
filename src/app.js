const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

//🔵SENTENCIAS PARA EL EJERCICIO DE EXPRESS - USUARIOS🔵

//🔵Respuesta del endpoint
let data = [
  {id: 1, nombre: "Cristiano", apellido: "Ronaldo", tlfn: 604053435},
  {id: 2, nombre: "Agustín", apellido: "Alonso", tlfn: 604053435},
  {id: 3, nombre: "Eder", apellido: "Castro", tlfn: 604053435},
  {id: 4, nombre: "Diego", apellido: "Perez", tlfn: 604053435},
];

//🔵Imprimer el primer usuario del array
app.get('/users/user1/', (req, res) => {
  res.json(data[0]);
});

//🔵Imprimir todos los usuarios del array
app.get('/users/', (req, res) => {
  res.json(data);
});

//🔵Imprimir usuario segun el ID
app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = data.find((u) => u.id === id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({Error: "Usuario no encontrado"});
  }
});


//🔵añadir nuevo usuario mediante el formulario
app.post('/users', (req, res) =>{
  const id = data.length + 1
  const { nombre, apellido, tlfn } = req.body;
    console.log(nombre);

  const nuevoUser = {id, nombre, apellido, tlfn};
  data.push(nuevoUser);

  res.status(201).json({ message: "Usuario añadido correctamente", user: nuevoUser });
})

// //🔵Imprimir usuario segun el ID del input
// app.get('/users/', (req, res) => {
//   const user = req.body;
//   user.id = user.lenght + 1;
//   data.push(user);
//   res.json(user);
// });


app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
