import type { ProductRepository } from "../../domain/product/repository.js";
import type { ProductService } from "./products.types.js";

export function createProductService(repository: ProductRepository): ProductService {
    return {
        async getProducts(take, categoryId) {
            return repository.getAllProducts(take, categoryId)
        },
        
        async findProduct(id) {
            return repository.findProductById(id)
        },
        
        async createNewProduct(data) {
            let { name, price, image, categoryId } = data;

            if (
                typeof name !== 'string' || !name.trim() ||
                typeof price !== 'number' || price <= 0 ||
                typeof image !== 'string' || !image.trim() ||
                typeof categoryId !== 'number' || categoryId <= 0
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
    }
}