const fs = require ('fs');
const router = require('express').Router();

class Carrito {
    static id = 1;
    carts = [];
    constructor(fileName,productList) {
        this.fileName = fileName,
        this.productList = productList
        }
    async createCart(){
        try {
            const newCart = {
                id : Carrito.id ++,
                timestamp : Date.now(),
                productos:[]
            }
            this.carts.push(newCart);
            console.log(`Id del Carrito: ${newCart.id}`);

            await fs.promises.writeFile(this.fileName, JSON.stringify(this.carts,null,2));
        }
        catch (e) {
            console.log(e);
        }
    }
    async deleteCart(id){
        try{
            const carritos = JSON.parse(await fs.promises.readFile(this.fileName,'utf-8'));
            const deleteId = carritos.find(el=>el.id ===id);
            const result = carritos.filter(e=> e.id != deleteId.id);
            this.carts = result;
            await fs.promises.writeFile(this.fileName, JSON.stringify(this.carts,null,2))
        }
        catch(e){
            console.log(e);
        }
    }
    async getCart(id){
        try {
            const carritos = JSON.parse(await fs.promises.readFile(this.fileName, 'utf-8'));
            const result = carritos.find(e => e.id === id);
            
            if (result === undefined) {
                const e = 'El ID ingresado no corresponde a un carrito';
                return e;
            } else {
                console.log(result);
                return result;
            }
        } catch (err) {
            console.log(err);
        }
    }
    async saveProduct(id,idProducto){
        try{
            const carritos = JSON.parse(await fs.promises.readFile(this.fileName,'utf-8'));
            const productos = JSON.parse(await fs.promises.readFile(this.productList,'utf-8'));

            const result = carritos.find(e=> e.id ===id);

            if (result === undefined){
                console.log('El id ingresado no corresponde a un carrito');
            }else{
                const resultProduct = productos.find(e => e.id === idProducto);
                if(resultProduct === undefined){
                    console.log('El id ingresado no corresponde a un producto');
                }else{

                    result.productos.push(resultProduct);

                    const index = carritos.indexOf(result);
                    console.log(index);
                    carritos.splice(index,1,result);
                    this.carts = carritos;
                    
                    await fs.promises.writeFile(this.fileName,JSON.stringify(this.carts,null,2));
                }
            }
        }
        catch(e){
            console.log(e)
        }
    }
    async deleteProduct(id,idProducto){
        try{
            const carritos = JSON.parse(await fs.promises.readFile(this.fileName,'utf-8'));
            const cartSelect = carritos.find(e=> e.id ===id);
            if (cartSelect === undefined){
                console.log('El id ingresado no corresponde a un carrito');
            }else{
                const resultProduct = cartSelect.productos.find(e=>e.id===idProducto);
                if(resultProduct === undefined){
                    console.log('El id ingresado no corresponde a un producto');
                }else{
                    const index = cartSelect.productos.indexOf(resultProduct);
                    cartSelect.productos.splice(index,1);
                    console.log(cartSelect);

                    const indexCart = carritos.indexOf(cartSelect);
                    carritos.splice(indexCart,1,cartSelect);

                    this.carts=carritos;

                    await fs.promises.writeFile(this.fileName,JSON.stringify(this.carts,null,2));
                }
            }
        }
        catch(e){
            console.log(e);
        }
    }
}

module.exports = { 
    router,
    Carrito
};