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
        let { name, price, image, category } = data;

        if(await repository.findProductByTitle(name)) {
            return null;
        }
        let product = {
            name: name,
            price: price,
            image: image,
            category: category
        };
        
        return await repository.createProduct(product);
    }
    return {getProducts, findProduct, createNewProduct}
}