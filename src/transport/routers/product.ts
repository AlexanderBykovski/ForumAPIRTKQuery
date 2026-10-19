import { Router } from 'express';
import type { ProductHandler } from '../handlers/product/product.types.js';


export function createProductRouter(handler: ProductHandler) {
    const productRouter = Router()

    productRouter.get('/', handler.getAllProducts);
    productRouter.get('/:id', handler.getProductById);
    productRouter.post('/', handler.createProduct);
    
    return productRouter
}