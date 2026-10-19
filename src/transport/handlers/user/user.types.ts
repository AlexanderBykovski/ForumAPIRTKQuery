import type { Request, Response } from "express"
import type { AuthCredentialsRequest } from "../../dto/auth/requests";

export interface UserHandler{
    register: (
        req: Request<{}, {}, AuthCredentialsRequest>,
        res: Response
    ) => Promise<void>;
    login: (
        req: Request<{}, {}, AuthCredentialsRequest>,
        res: Response
    ) => Promise<void>
}