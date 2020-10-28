const morgan = require('morgan');
const express = require('express');
const app = express();
const recurso = require('./routes/recurso');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res, next) =>
{
    return res.status(200).json({code: 1, message: "Bienvenido al Proyecto Final"});
});

//Acceder a cada uno de los recursos
app.use("/recurso", recurso);

app.use((req, res, next) =>
{
    return res.status(404).json({code: 404, message: "URL NO ENCONTRADA"});
});

app.listen(process.env.PORT || 3000, () =>
{
    console.log("Server is running...");
});