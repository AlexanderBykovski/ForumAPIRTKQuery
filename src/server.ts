import express from "express"
import { createProductRouter } from "./transport/routers/product.js"
import { createProductRepository } from "./repositories/products.js"
import { createProductService } from "./services/products/products.js"
import { createProductHandler } from "./transport/handlers/product/product.js"
import { db } from "./prisma/db.js"
import { createCategoryRepository } from "./repositories/category.js"
import { createCategoryService } from "./services/category/category.js"
import { createCategoryHandlers } from "./transport/handlers/category/category.js"
import { createCategoryRouter } from "./transport/routers/category.js"

const PORT = 8000
const HOST = "localhost"

const app = express()


const productRepository = createProductRepository(db);
const productService = createProductService(productRepository);
const productHandler = createProductHandler(productService);
const productRouter = createProductRouter(productHandler);

const categoryRepository = createCategoryRepository(db);
const categoryService = createCategoryService(categoryRepository);
const categoryHandlers = createCategoryHandlers(categoryService);
const categoryRouter = createCategoryRouter(categoryHandlers);

app.use(express.json());
app.use("/products", productRouter);
app.use("/categories", categoryRouter)

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`)
})