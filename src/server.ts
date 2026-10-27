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
import { signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken } from "./lib/jwt.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import { createRequireAuth } from "./transport/middlewares/require-auth.js"


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
const userService = createAuthService(userRepository, 
    { hash: hashPassword, verify: verifyPassword}, 
    { signAccessToken, signRefreshToken},
    { verifyAccessToken, verifyRefreshToken}
)


const userHandler = createUserHandler(userService)
const requireAuth = createRequireAuth(verifyAccessToken)
const userRouter = createUserRouter(userHandler, requireAuth)

app.use(cors({
    origin: "http://localhost:5173"
}))
app.use(cookieParser())
app.use(express.json());

app.use("/products", productRouter);
app.use("/categories", categoryRouter)
app.use("/auth", userRouter)

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`)
})  