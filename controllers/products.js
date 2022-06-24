const fs = require ('fs');
const router = require('express').Router();

class Contenedor {
    static id = 0;
    productos = [];
    constructor(fileName) {
        this.fileName = fileName
    }
    async save(producto) {
        try {
            const productList = JSON.parse(await fs.promises.readFile(this.fileName, 'utf-8'));

            if (productList.length <= 0) {
                Contenedor.id = 1;
            } else {
                this.productos = productList;
                Contenedor.id++;
                Contenedor.id = productList.length + 1;
            }

            producto.id = Contenedor.id;
            producto.timestamp = Date.now();

            this.productos.push(producto);

        } catch (err) {
            console.log(err);
        }
        try {
            await fs.promises.writeFile(this.fileName, JSON.stringify(this.productos, null, 2));
        } catch (err) {
            console.log(err);
        }
        return Contenedor.id;
    }
    async getById(id) {

        try {
            const products = JSON.parse(await fs.promises.readFile(this.fileName, 'utf-8'));
            const result = products.find(e => e.id === id);
            if (result === undefined) {
                const e = 'El ID ingresado no corresponde a un producto';
                return e;
            } else {
                console.log(result);
                return result;
            }
        } catch (err) {
            console.log(err);
        }
    }
    async getAll() {
        try {
            const productList = JSON.parse(await fs.promises.readFile(this.fileName, 'utf-8'));
            return productList;
        } catch (err) {
            console.log(err);
        }
    }
    async deleteById(id) {
        try {
            const products = JSON.parse(await fs.promises.readFile(this.fileName, 'utf-8'));
            const deleteId = products.find(e => e.id === id);
            const result = products.filter(e => e.id != deleteId.id)
            Contenedor.productos = result;
            await fs.promises.writeFile(this.fileName, JSON.stringify(Contenedor.productos, null, 2));
        } catch (err) {
            console.log(err);
        }
    }
    async modify(product, idChange) {
        try {
            const productList = JSON.parse(await fs.promises.readFile(this.fileName, 'utf-8'));
            const result = productList.find(e => e.id === idChange);
            console.log(result);
            if (result === undefined) {
                console.log('El ID ingresado no corresponde a un producto');
            } else {
                product.id = idChange;
                const index = productList.indexOf(result);
                console.log(index);
                productList.splice(index, 1, product);
                this.productos = productList;
                try {
                    await fs.promises.writeFile(this.fileName, JSON.stringify(this.productos, null, 2));
                } catch (err) {
                    console.log(err);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = {
    router,
    Contenedor
}