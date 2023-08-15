import { promises as fs } from 'fs'
import express from 'express'

const PORT = 4000;

const app = express()

// const prods = [
//     { id: 1, nombre: "Iphone", limite: "Celular" },
//     { id: 2, nombre: "Notebook", limite: "Computacion" },
//     { id: 3, nombre: "IPAD", limite: "Computacion" }
// ]



app.get('/products', (req, res) => {
    const { limite } = req.query
    if (limite) {
        const products = prods.slice(prod => prod.limite === limite)
        res.send(products)
    } res.send(prods)
})

app.get('/products/:id', (req, res) => {
    const prod = prod.filter(prod => prod.id === parseInt(req.params.id))
    if (prod)
        res.send(prod)
    else res.send("Producto no existente")


})


app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)

})

const path = './products.json'

class ProductManager {
    constructor() {

    }

    async getProducts() {
        const prods = JSON.parse(await fs.readFile(path, 'utf-8'))
        return prods

    }


    async getProductsById(id) {
        const prods = JSON.parse(await fs.readFile(path, 'utf-8'))
        const product = prods.find(prod => prod.id === id)

        if (product) {
            console.log(product)
        } else { console.log('Producto sin encontrar') }
    }

    async addProduct(product) {
        const prods = JSON.parse(await fs.readFile(path, 'utf-8'))
        const producto = prods.find(prod => prod.id === product.id)


        if (producto) {
            console.log("Producto existente")
        } else {
            prods.push(product)
            await fs.writeFile(path, JSON.stringify(prods))

        }
    }

    async upDateProduct(id, product) {
        const prods = JSON.parse(await fs.readFile(path, 'utf-8'))
        const indice = prods.findIndex(prod => prod.id === id)

        if (indice != -1) {
            prods[indice].title = product.title
            prods[indice].description = product.description
            prods[indice].price = product.price
            prods[indice].thumbnail = product.thumbnail
            prods[indice].stock = product.stock


            await fs.writeFile(path, JSON.stringify(prods))
        } else { console.log('Producto sin encontrar') }
    }

    async deleteProduct(id) {
        const prods = JSON.parse(await fs.readFile(path, 'utf-8'))
        const producto = prods.find(prod => prod.id === id)

        if (producto) {
            await fs.writeFile(path, JSON.stringify(prods.filter(prod => prod.id != id)))
        } else { console.log('Producto sin encontrar') }
    }


}

class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
        this.id = Product.aumentarId()
    }

    static aumentarId() {
        if (this.IdAumentar) {
            this.IdAumentar++
        } else {
            this.IdAumentar = 1
        }
        return this.IdAumentar
    }
}

const product1 = new Product("Celular", "Samsung", 50000, [], "CC111SG", 20)
const product2 = new Product("Notebook", "Apple", 250000, [], "NN111AP", 30)
const product3 = new Product("TV", "LG", 80000, [], "TV111LG", 40)

const productManager = new ProductManager()

productManager.addProduct(product1)
productManager.addProduct(product2)
productManager.addProduct(product3)

productManager.getProducts()

productManager.getProductsById(1)
