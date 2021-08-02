import { Request,Response,NextFunction } from "express";
import *as jwt from "jsonwebtoken";
import config from "../config/config";

export const checkJwt= (req:Request,res:Response,next:NextFunction)=>{

    const token=<string>req.headers['token'];
    let jwtPayload;

    try {
        jwtPayload=<any>jwt.verify(token, config.jwtSecret);
        res.locals.jwtPayload = jwtPayload


    } catch (e) {
        return res.status(401).json({
            message:'No esta autorizado'
        })
    }
    //aca realizamos una accion desestructury

    const { id, email } = jwtPayload;
    //aca definimos cuanto tiempo se va a mantener el token 

    const newToken = jwt.sign({ id, email }, config.jwtSecret, { expiresIn: '2h' });

    next();


}