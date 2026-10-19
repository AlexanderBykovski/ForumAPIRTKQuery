import type { ProductService } from "../../../services/products/products.types.js";
import type { Product } from "../../../domain/product/entity.js";
import type { ProductHandler } from "./product.types.js";

export function createProductHandler(service: ProductService): ProductHandler {
    return {
        async getAllProducts(req, res) {
            const { take, categoryId } = req.query;

            let takeNum: number | undefined;
            let categoryIdNum: number | undefined;

            if (take !== undefined) {
                takeNum = Number(take);

                if (!Number.isInteger(takeNum) || takeNum <= 0) {
                    res.status(400).json({
                        message: "Query parameter 'take' must be a positive integer!"
                    });
                    return;
                }
            }

            if (categoryId !== undefined) {
                categoryIdNum = Number(categoryId);

                if (!Number.isInteger(categoryIdNum) || categoryIdNum <= 0) {
                    res.status(400).json({
                        message: "Query parameter 'categoryId' must be a positive integer!"
                    });
                    return;
                }
            }

            const products = await service.getProducts(
                takeNum,
                categoryIdNum
            );

            res.status(200).json(products);
        },
    
        async getProductById(
            req, 
            res
        ) {
            const productId = Number(req.params.id);
    
            if (!Number.isInteger(productId) || productId <= 0) {
                res.status(400).json({
                    message: 'id must be a positive integer',
                });
                return
            }
    
            const product = await service.findProduct(productId);
    
            if (!product) {
                res.status(404).json({
                    message: 'Product not found',
                });
                return
            }
    
            res.status(200).json(product);
        },
    
        async createProduct(
            req, 
            res
        ) {
            try {
                const { name, price, image, categoryId } = req.body;
                
                if (
                    typeof name !== 'string' || !name.trim() ||
                    typeof price !== 'number' || price <= 0 ||
                    typeof image !== 'string' || !image.trim() ||
                    typeof categoryId !== 'number' || categoryId <= 0
                ) {
                    res.status(422).json({
                        message: 'Invalid product data',
                    });
                    return 
                }
                const createdProduct: Product | null = await service.createNewProduct({
                    name,
                    price,
                    image,
                    categoryId
                });
    
                if (!createdProduct) {
                    res.status(409).json({
                        message: 'Product already exists',
                    });
                    return
                }
    
                res.status(201).json(createdProduct);
            } catch (error) {
                console.log(error)
                if (error instanceof Error) {
                    if (error.message === 'PRODUCT_ALREADY_EXSISTS') {
                        res.status(409).json({
                            message: 'Product already exists'
                        })
                    }
                }
                res.status(500).json({
                    message: 'Internal server error'
                })
            }
        }
    }
}
