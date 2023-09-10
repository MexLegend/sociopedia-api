import { verify } from 'jsonwebtoken';

export const AUTH = {
    verifyToken(req: any, res: any, next: any) {
        try {

            let token = req.header('Authorization');

            if (!token) return res.status(403).send("Access Denied");

            if (token.startsWith("Bearer ")) {
                token = token.slice(7, token.length).trimLeft();
            }

            const verified = verify(token, process.env.JWT_SECRET!);

            req.user = verified;

            next();

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },
    verifyAdmin(req: any, res: any, next: any) {
        let user = req.user;

        if (user.role !== 'ADMINISTRADOR') return res.status(403).send("Access Denied - Not Enough Privileges");

        next();
    },
};
