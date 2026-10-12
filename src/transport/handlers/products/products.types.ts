import type { Request, Response } from "express";
import type { ProductResponse } from "../../dto/responses.js";
import type { ErrorResponse } from "../../dto/errors.js";
import type { CreateProductRequest } from "../../dto/requests.js";


export interface ProductHandler{
    getAllProducts: (
        req: Request,
        res: Response<ProductResponse[] | ErrorResponse>
    ) => Promise<void>;
    getProductById: (
        req: Request,
        res: Response<ProductResponse | ErrorResponse>
    ) => Promise<void>;
    createProduct: (
        req: Request<{}, {}, CreateProductRequest>,
        res: Response<ProductResponse | ErrorResponse>
    ) => Promise<void>;

}

