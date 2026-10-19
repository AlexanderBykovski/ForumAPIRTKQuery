import { isStructuredError } from "@prisma/orm-postgres/utils"
import type { CreateProductInput, ProductRepository } from "../domain/product/repository.js"


type Database = typeof import("../prisma/db.ts").db

export function createProductRepository(database: Database): ProductRepository {
    return {
        async getAllProducts(take, categoryId){
            const query = database.orm.public.Product
                .where({categoryId})
                .include("category")
                .orderBy((product) => product.id.asc())
                
    
            if(!take){
                return query.all()
            } 
            return await query.limit(take).all()
        },
    
        async createProduct(product){
            try{
                    const { categoryId, ...fields} = product
                    return database.orm.public.Product.create({
                        ...fields, 
                        categoryId, 
                        category: (category) =>
                            category.connect({id:categoryId})
                    });
            } catch(error){
                if(error instanceof Error && "sqlState" in error){
                    if( error.sqlState === "23505"){
                        throw new Error("PRODUCT_ALREADY_EXSISTS")
                    }
                    if(isStructuredError(error) && error.code === "ORM.RELATION_ROW_MISSING"){
                        throw new Error("CATEGORY_NOT_FOUND")
                    }
                }
                throw error
            }
        },
        async findProductById(id){
            return await database.orm.public.Product
                .where({id: id})
                .include("category")
                .first()
        },
    
        async findProductByTitle(name) {
            return await database.orm.public.Product
                .where({name: name})
                .include("category")
                .first()
        }
    }
}
