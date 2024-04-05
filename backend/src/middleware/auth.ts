import {Request,Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";

declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}

const verifyToken = (req:Request,res:Response,next: NextFunction)=>{

            const token = req.cookies["auth_token"];

            if(!token){
                return res.status(401).json({message:"unauthorized"});
            }


            try{
                const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY as string);

                
                req.userId = (decoded as JwtPayload).userId;

                next();

            }catch(err){
                 
                return res.status(401).json({message:"unauthorized"});
            }
            

};

export default verifyToken;