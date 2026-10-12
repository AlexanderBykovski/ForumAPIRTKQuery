import type { Category } from "../category/entity.js"
import type { Product, ProductWithCategory } from "./entity.ts"

export interface CreateProductInput {
    name: string, 
    price: number,
    image: string,
    categoryId: number
}

export interface ProductRepository {
    getAllProducts: (take?: number, categoryId?: number) => Promise<ProductWithCategory[]>,
    createProduct: (product: CreateProductInput) => Promise<Product>,
    findProductById: (id: number) => Promise<ProductWithCategory | null>,
    findProductByTitle: (name: string) => Promise<ProductWithCategory | null>,
}