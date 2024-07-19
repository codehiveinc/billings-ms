import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { createResponse } from "../utils/response";
import { verifyToken } from "../utils/jwt";

export function authenticate(req : Request, res : Response, next : Function){
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json(createResponse(null, 'Token is required', false, 401));
    }

    try {
        const decoded = verifyToken(token);
        (req as any).user = decoded;
        next();
    } catch (error) {
    
        return res.status(401).json(createResponse(null, 'Invalid token', false, 401));
    }
}

