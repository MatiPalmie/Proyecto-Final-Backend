const router = require('express').Router();
const Carrito = require('../controllers/carrito')

const carrito = new Carrito.Carrito('carrito.txt','products.txt');

router.post('/create', async (req, res) => {
    await carrito.createCart();
    res.json(carrito);
});
router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    await carrito.deleteCart(id);
    res.json(`Se elimino el Carrito id número : ${id}`);
});
router.get('/:id/productos', async (req, res) => {
    const id = parseInt(req.params.id);
    let cart = await carrito.getCart(id);
    res.status(200).json(cart)
});
router.post('/:id/productos', async (req, res) => {
    const id = parseInt(req.params.id);
    const productId = parseInt(req.body.idProduct);
    let cart = await carrito.saveProduct(id,productId);
    res.status(200).json('Producto agregado con éxito');

});
router.delete('/:id/productos/:id_prod', async (req, res) => {
    const id = parseInt(req.params.id);
    const idProduct = parseInt(req.params.id_prod);
    let cart = await carrito.deleteProduct(id,idProduct);
    res.status(200).json(cart)
});

module.exports = router;