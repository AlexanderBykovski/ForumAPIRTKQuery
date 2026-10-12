import express from "express"
import { createProductRouter } from "./routers/products.js"
import { createProductRepository } from "./repositories/products.js"
import { createProductService } from "./services/products/products.js"
import { createProductHandler } from "./transport/handlers/products/products.js"
import { db } from "./prisma/db.js"

const PORT = 8000
const HOST = "localhost"

const app = express()

const productRepository = createProductRepository(db)
const productService = createProductService(productRepository)
const productHandler = createProductHandler(productService)
const productRouter = createProductRouter(productHandler)

app.use(express.json())
app.use("/products", productRouter)

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`)
})