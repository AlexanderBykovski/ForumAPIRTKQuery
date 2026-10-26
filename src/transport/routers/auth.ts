import { Router, type RequestHandler } from "express";
import type { UserHandler } from "../handlers/user/user.types";
import { createRequireAuth } from "../middlewares/require-auth";

export function createUserRouter(
    handler: UserHandler, 
    ruquireAuth: RequestHandler
){
    const router = Router()

    router.post('/register', handler.register)
    router.post("/login", handler.login)

    router.post('/refresh', handler.refresh)
    router.get('/me', ruquireAuth ,handler.me)
    return router
}