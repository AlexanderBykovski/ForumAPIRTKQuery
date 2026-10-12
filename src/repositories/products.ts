import { isStructuredError } from "@prisma/orm-postgres/utils"
import type { CreateProductInput } from "../domain/product/repository.js"


type Database = typeof import("../prisma/db.ts").db

export function createProductRepository(database: Database){
    async function getAllProducts(take?: number, categoryId?: number){
        const query = database.orm.public.Product
            .where({categoryId})
            .include("category")
            .orderBy((product) => product.id.asc())
            

        if(!take){
            return query.all()
        } 
        return await query.limit(take).all()
    }

    async function createProduct(product: CreateProductInput){
        try{
            const { categoryId, ...fields } = product
            return await database.orm.public.Product.create({
                ...fields, 
                category: (category) => category.connect({id: categoryId})
            })
        } catch(error){
            if(error instanceof Error && "sqlState" in error){
                if( error.sqlState === "23505"){
                    throw new Error("PRODUCT_ALREADY_EXSISTS")
                }
                if(isStructuredError(error) && error.code === "ORM.RELATION_ROW_MISSING"){
                    throw new Error("CATEGORY_NOT_FOUND")
                }
            }
        }
    }
    async function findProductById(id: number){
        return await database.orm.public.Product
            .where({id: id})
            .include("category")
            .first()
    }

    async function findProductByTitle(name: string) {
        return await database.orm.public.Product
            .where({name: name})
            .include("category")
            .first()
    }
    return {getAllProducts, createProduct, findProductById, findProductByTitle}
}
