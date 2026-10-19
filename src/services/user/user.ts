import type { UserRepository } from "../../domain/user/repository";
import type { PasswordHasher, TokenSigner, UserService } from "./user.types";

export function createAuthService(
    repository: UserRepository, 
    passwordHasher: PasswordHasher, 
    tokenSigner: TokenSigner
): UserService{
    return {
        async register(input){
            const { email, password } = input
            const passwordHash = await passwordHasher.hash(password)
            const user = await repository.createUser({
                email: email.trim().toLowerCase(),
                hashPassword: passwordHash,
            })
            return {
                id: user.id,
                email: user.email
            }
        },
        async login(input){
            const { email, password } = input
            const user = await repository.getByEmail(email.trim().toLowerCase())
            if (!user || ! await passwordHasher.verify(user.hashPassword, password)){
                throw new Error("Invalid credentials")
            }
            return {
                user: {
                    id: user.id,
                    email: user.email
                },
                accessToken: tokenSigner.signAccessToken(user.id)
            }
        }
    }
}