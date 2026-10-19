import type { UserService } from "../../../services/user/user.types";
import type { UserHandler } from "./user.types";

export function createUserHandler(service: UserService): UserHandler{
    return {
        async register(req, res){
            try {
                const { email, password } = req.body
                const user = await service.register({
                    email,
                    password
                })
                res.status(201).json(user)
            } catch (error) {
                res.status(500).json(error)
            }
        },
        async login(req, res){
            try {
                const { email, password } = req.body
                const result = await service.login({
                    email,
                    password
                })
                res.cookie("accessToken", result.accessToken, {
                    httpOnly: true,
                    sameSite: "lax",
                    maxAge: 15*60*1000,
                    path: "/"
                })
                console.log(result.accessToken)
                res.status(200).json(result.user)
            } catch(error){
                res.status(500).json(error)
        }}
    }
}