const express = require('express');
const app = express();

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(express.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// importing routes
const employeeRouters = require('./routes/FuncionarioRota')
//Route
app.use('/funcionarios',employeeRouters)

app.use('/test', (req, res) => {
    res.send("Test route");
  });

app.use('/',(req,res)=>{
  res.send("Hello World form NodeJS express.");
});

app.listen(app.get('port'),()=>{
  console.log("Start server on port "+app.get('port'))
})