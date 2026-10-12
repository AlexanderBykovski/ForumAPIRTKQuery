import type { Product } from "./entity.ts"

export interface CreateProductInput {
    name: string, 
    price: number,
    image: string,
    category: string
}

export interface ProductRepository {
    getAllProducts: (take?: number) => Promise<Product[]>,
    createProduct: (product: CreateProductInput) => Promise<Product>,
    findProductById: (id: number) => Promise<Product | null>,
    findProductByTitle: (name: string) => Promise<Product | null>,
}