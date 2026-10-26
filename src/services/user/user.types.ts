import type { PublicUser } from "../../domain/user/entity";

export interface AuthInput{
    email: string;
    password: string;
}

export interface PasswordHasher{
    hash: (password: string) => Promise<string>,
    verify: (hash: string, password: string) => Promise<boolean>
}

export interface TokenSigner{
    signAccessToken: (userId: number) => string,
    signRefreshToken: (userId: number) => string,
}

export interface TokenVerifier{
    verifyAccessToken: (token: string) => number,
    verifyRefreshToken: (token: string) => number,
}

export interface UserTokens{
    accessToken: string,
    refreshToken: string
}

export interface UserService{
    register: (input: AuthInput) => Promise<PublicUser>,
    login: (input: AuthInput) => Promise<
        {user: PublicUser} & UserTokens
    >,
    refresh: (refreshToken: string) => Promise<UserTokens>,
    me: (userId: number) => Promise<PublicUser>,
}