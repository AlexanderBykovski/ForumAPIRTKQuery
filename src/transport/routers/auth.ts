import { Router } from "express";
import type { UserHandler } from "../handlers/user/user.types";

export function createUserRouter(handler: UserHandler){
    const router = Router()

    router.post('/register', handler.register)
    router.post("/login", handler.login)
    return router
}