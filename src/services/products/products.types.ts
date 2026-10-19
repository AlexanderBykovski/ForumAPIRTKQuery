import type { Product } from "../../domain/product/entity.js";

export interface CreateProductInput {
    name: string;
    price: number;
    image: string;
    categoryId: number;
}

export interface ProductService {
    getProducts: (take?: number, categoryId?: number) => Promise<Product[]>;
    findProduct: (id: number) => Promise<Product | null>,
    createNewProduct: ( data: CreateProductInput) => Promise<Product | null>,
}