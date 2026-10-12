import type { ErrorResponse } from "../../dto/errors.js"
import type { CreateProductRequest } from "../../dto/requests.js";
import type { ProductResponse } from "../../dto/responses.js";
import type { Request, Response } from "express";
import type { ProductService } from "../../../services/products/products.types.js";
import type { Product } from "../../../domain/product/entity.js";

export function createProductHandler(service: ProductService){
    async function getAllProducts(
        req: Request,
        res: Response<ProductResponse[] | ErrorResponse>
    ){

        const { take } = req.query
        if (!take) {
            res.status(200).json(await service.getProducts());
            return
        }
        const takeNum = Number(take)

        if(!takeNum || !Number.isInteger(takeNum) || takeNum < 0) {
            res.status(400).json(
                {
                    message: "Query parameter 'take' is incorrect!"
                }
            )
            return
        }
        const products = await service.getProducts(takeNum)
        res.status(200).json(products)
    }

    async function getProductById(
        req: Request, 
        res: Response<ProductResponse | ErrorResponse>
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
    }

    async function createProduct(
        req: Request<{}, {}, CreateProductRequest>, 
        res: Response<ProductResponse | ErrorResponse>
    ) {
        try {
            const { name, price, image, category } = req.body;

            if (
                typeof name !== 'string' || !name.trim() ||
                typeof price !== 'number' || price <= 0 ||
                typeof image !== 'string' || !image.trim() ||
                typeof category !== 'string' || !category.trim()
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
                category
            });

            if (!createdProduct) {
                res.status(409).json({
                    message: 'Product already exists',
                });
                return
            }

            res.status(201).json(createdProduct);
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === 'PRODUCT_ALREADY_EXSISTS') {
                    res.status(409).json({
                        message: 'Product already exists'
                    })
                }
            }
            return res.status(500).json({
                message: 'Internal server error'
            })
        }
    }
    return { getAllProducts, createProduct, getProductById}
}
