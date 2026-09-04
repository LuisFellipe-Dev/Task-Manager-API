import type { Request , Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = {
    authUserToken: (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.trim()){
            return res.status(401).json({message: "O token é necessário para está ação."})
        }

        const [type, token] = authHeader.split(" ");

        if(type !== "Bearer" || !token){
            return res.status(401).json({message: "O token é inválido."})
        }

        const secret = process.env.JWT_SECRET;

        if(!secret){
            throw new Error("JWT_SECRET não configurado.");
        }

        try {
            const auth = jwt.verify(token, secret);

            if(
                typeof auth !== "object" ||
                auth === null ||
                !("id" in auth) ||
                typeof auth.id !== "number"
            ){
                throw new Error("Erro ao verificar token.");
            }

            req.userId = auth.id;

            next();
        } catch (error) {
            return res.status(401).json({message: "O token é inválido."})
        }
    }
}