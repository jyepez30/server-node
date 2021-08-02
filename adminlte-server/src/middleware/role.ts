import { Request, Response, NextFunction } from "express";
//como vamos a trabajar con la base de datos importamos import { Usuario } from "../entity/Usuario";
import { Usuario } from "../entity/Usuario";

import { getRepository } from "typeorm";

// como pueden existir varios roles se crea un array como variable export const checkRole = (roles: Array<string>) => 
export const checkRole = (roles: Array<string>) => {

  return async (req: Request, res: Response, next: NextFunction) => {
    //destructury
    const { id } = res.locals.jwtPayload;


    const usuarioRepository = getRepository(Usuario);

    //inicializamos la variable usuario
    let usuario: Usuario;

    try {

       //aca buscamos en la consulta si es adminitrador y mandamos la variable id 
      usuario = await usuarioRepository.findOneOrFail(id);
    } catch (e) {
      res.status(401).json({ message: 'No esta autorizado' });
    }

    //Check de lo que vamos a mandar
    //en base a esto se chequea que rol tiene

    const { role } = usuario;

    if (roles.includes(role)) {
      next();

      
    } else {
      res.status(401).json({ message: 'No esta autorizado' });
    }


  }


}