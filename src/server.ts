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
import { createUserRepository } from "./repositories/user.js"
import { createAuthService } from "./services/user/user.js"
import { createUserHandler } from "./transport/handlers/user/user.js"
import { hashPassword, verifyPassword } from "./lib/password.js"
import { createUserRouter } from "./transport/routers/auth.js"
import { signAccessToken } from "./lib/jwt.js"

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

const userRepository = createUserRepository(db)
const userService = createAuthService(userRepository, { hash: hashPassword, verify: verifyPassword}, { signAccessToken})
const userHandler = createUserHandler(userService)
const userRouter = createUserRouter(userHandler)

app.use(express.json());
app.use("/products", productRouter);
app.use("/categories", categoryRouter)
app.use("/auth", userRouter)

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`)
})
