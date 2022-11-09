const express = require('express');
const classContainer = require('./container/archivo.container');

const app = express();

const PORT = 8080;
//instanciamos la clase
const archivo = new classContainer('./container/productos.json');

app.get('/productos', async (req, res) => {
    const products = await archivo.getAll();
    res.send({ productos: products });
});

app.get('/productoRandom', async (req, res) => {
    const products = await archivo.getAll();
    const random = parseInt(Math.random() * products.length);
    res.send({ productos: products[random] });
});
const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
});
