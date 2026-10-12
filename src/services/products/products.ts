import type { ProductRepository } from "../../domain/product/repository.js";
import type { CreateProductInput } from "./products.types.js";

export function createProductService(repository: ProductRepository) {
    async function getProducts(take?: number) {
        return repository.getAllProducts(take)
    }
    
    async function findProduct(id: number) {
        return repository.findProductById(id)
    }
    
    async function createNewProduct(data: CreateProductInput) {
        let { name, price, image, categoryId } = data;

        if (
            typeof name !== 'string' || !name.trim() ||
            typeof price !== 'number' || price <= 0 ||
            typeof image !== 'string' || !image.trim() ||
            typeof categoryId !== 'string' || categoryId <= 0
        ) {
            throw new Error('INVALID_PRODUCT_DATA')
        }
        let product = {
            name: name,
            price: price,
            image: image,
            categoryId: categoryId
        };
        
        return await repository.createProduct(product);
    }
    return {getProducts, findProduct, createNewProduct}
}