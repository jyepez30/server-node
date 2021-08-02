import { getRepository } from "typeorm";
import { Request,Response } from "express";
import { Usuario } from "../entity/Usuario";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import { validate } from "class-validator";


class AuthController{

    static login = async (req: Request, res: Response) => {

        const { email, password } = req.body;


        //si no existe el email y el password retorna 'Email o Password son requeridos..'
        if (!email && password) {    
          return res.status(400).json({
            message: 'Email o Password son requeridos..'
          });    
        }

        //aca realizamos la consulta a la base de datos  y vamos almacenar los datos en la variable usuario

        //(Usuario) esto viene del entity osea toda la estructura que este alli creada nos la va a enviar la consulta getRepository(Usuario)
        const usuarioRepository = getRepository(Usuario);
        let usuario: Usuario; 


        try {
            //como estamos trabajando con promesas  se con awit y va a buscar where: { email }
          usuario = await usuarioRepository.findOneOrFail({ where: { email } });
    
        } catch (e) {            
          return res.status(400).json({
            message: 'El email o password son incorrectos'
          });    
        }

        //si no existe el email y el password retorna 'El email o password son incorrectos'
        if (!usuario.checkPassword(password)) {    
          return res.status(400).json({
            message: 'El email o password son incorrectos'
          });    
        }
        
        //aca verificamos el tiempo de expiracion del token 
        const token = jwt.sign({ id: usuario.id, email: usuario.email }, config.jwtSecret, { expiresIn: '2h' });
        res.json({
          message: 'ok',
          token
        });
      }
    


      
      static changePassword = async (req: Request, res: Response) => {
    
        const { id } = res.locals.jwtPayload;
        const {oldPassword,newPassword } = req.body;
        if (!(oldPassword && newPassword)) {
    
          res.status(400).json({
            message: 'No coinciden las contraseñas'
          });
    
        }
        
        //nos comunicamos con la base de datos
        const usuarioRepository = getRepository(Usuario);
        let usuario: Usuario;
    
        try {
    
          usuario = await usuarioRepository.findOneOrFail(id);
    
        } catch (e) { 
    
          res.status(400).json({    
            message: 'Porfavor hable con el administrador'
    
          });
        }
    
       //verificamos si el password o el usuario son correctos 
        if (!usuario.checkPassword(oldPassword)) {
          return res.status(401).json({
            message: 'revisar el antiguo password'
          });
        }
        

        usuario.password = newPassword;
    
        const errors = await validate(usuario, { validationError: { target: false, value: false } });
        //si no hay errores y la longitud es mayor a cero se manda a guardar el usuario 
        if (errors.length > 0) {
          return res.status(400).json(errors);
        }
        
        //esta linea guarda el usuario
        usuario.hashPassword();
        usuarioRepository.save(usuario);
        //se manda el mensaje 
        res.json({
          message: 'Se actualizo el password'
        });
        
    
      }
    
    
    }
    

export default AuthController