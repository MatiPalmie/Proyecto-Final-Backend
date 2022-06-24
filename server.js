const express = require ('express');
const app = express();
const productos = require('./routes/products');
const carrito = require('./routes/carrito');

const PORT = 8080; 

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static('public'));

app.use('/api/',productos,carrito);

app.listen(PORT, () => {
    console.log(`Server runnning on port ${PORT}`);
});