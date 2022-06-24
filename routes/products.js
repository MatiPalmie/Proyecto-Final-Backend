const router = require('express').Router();
const Contenedor = require('../controllers/products')

const productos = new Contenedor.Contenedor ('products.txt');

const admin = false;

router.get('/:id?', async (req, res) => {
    const id = parseInt(req.params.id);
    console.log(id)
    if(isNaN(id)){
        let list  = await productos.getAll();
        res.status(200).send({list});
    }else{
        let product = await productos.getById(id);
        res.status(200).send(product);
    }
});
router.post('/', async (req, res) => {
    if(admin){
    const {
        nombre,
        description,
        codigo,
        foto,
        precio,
        stock
    } = req.body;
    let product = ({
        nombre,
        description,
        codigo,
        foto,
        precio,
        stock
    });
    await productos.save(product);
    res.json({
        datos: product
    });
    }else{
        res.json({
            error:-1,
            descripcion:'ruta "/" POST no autorizado'})
    };
});
router.put('/:id', async (req, res) => {
    if(admin){
    const idChange = parseInt(req.params.id);
    const {
        nombre,
        description,
        codigo,
        foto,
        precio,
        stock
    } = req.body;
    let product = ({
        nombre,
        description,
        codigo,
        foto,
        precio,
        stock
    });
    await productos.modify(product, idChange);
    res.status(200).json({ msg: 'Se modificó el producto'});
    }else{
        res.json({
            error:-1,
            descripcion:'ruta "/:id" PUT no autorizado'})
    };
});
router.delete('/:id', async (req, res) => {
    if(admin){
    const id = parseInt(req.params.id);
    await productos.deleteById(id);
    res.status(200).json( {msg:'Se elimino correctamente'})
    }else{
        res.json({
            error:-1,
            descripcion:'ruta "/:id" DELETE no autorizado'})
    };
});

module.exports = router;