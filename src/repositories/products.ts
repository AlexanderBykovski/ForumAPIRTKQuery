import type { CreateProductInput } from "../domain/product/repository.js"


type Database = typeof import("../prisma/db.ts").db

export function createProductRepository(database: Database){
    async function getAllProducts(take?: number){
        const query = database.orm.public.Product.orderBy((product) => product.id.asc())
        if(!take){
            return query.all()
        } 
        return await query.limit(take).all()
    }

    async function createProduct(product: CreateProductInput){
        return await database.orm.public.Product.create(product)
    }
    async function findProductById(id: number){
        return await database.orm.public.Product.where({id: id}).first()
    }

    async function findProductByTitle(name: string) {
        return await database.orm.public.Product.where({name: name}).first()
    }
    return {getAllProducts, createProduct, findProductById, findProductByTitle}
}
