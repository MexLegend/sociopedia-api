"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTH = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
exports.AUTH = {
    verifyToken(req, res, next) {
        try {
            let token = req.header('Authorization');
            if (!token)
                return res.status(403).send("Access Denied");
            if (token.startsWith("Bearer ")) {
                token = token.slice(7, token.length).trimLeft();
            }
            const verified = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
            req.user = verified;
            next();
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    verifyAdmin(req, res, next) {
        let user = req.user;
        if (user.role !== 'ADMINISTRADOR')
            return res.status(403).send("Access Denied - Not Enough Privileges");
        next();
    },
};
//# sourceMappingURL=auth.js.map