import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Usuario } from "../entity/Usuario";
import { validate } from "class-validator";

class UsuarioController {

  static getAll = async (req: Request, res: Response) => {

    const usuarioRepository = getRepository(Usuario);

    try {

      const usuarios = await usuarioRepository.find();
      res.send(usuarios);

    } catch (e) {

      res.status(404).json({

        message: 'No hay Resultados'

      });

    }
  }

  static getById = async (req: Request, res: Response) => {

    const { id } = req.params;
    const usuarioRepository = getRepository(Usuario);

    try {

      const usuario = await usuarioRepository.findOneOrFail(id);
      res.send(usuario);
    } catch (e) {

      res.status(404).json({

        message: 'No hay Resultados'

      });

    }
  }

  static newUsuario = async (req: Request, res: Response) => {

    const { nombre, email, password, role } = req.body;
    const usuario = new Usuario();

    usuario.nombre = nombre;
    usuario.email = email;
    usuario.password = password;
    usuario.role = role;
    const usuarioRepository = getRepository(Usuario);

    try {

      usuario.hashPassword();
      await usuarioRepository.save(usuario);

    } catch (e) {

      return res.status(400).json({
        message: 'El email ya existe!!'
      });

    }

    res.send('Usuario creado..');

  }

  static editUsuario = async (req: Request, res: Response) => {

    let usuario;
    const { usuarioId } = req.params;
    const { id, nombre, email, role } = req.body;
    const usuarioRepository = getRepository(Usuario);

    try {

      usuario = await usuarioRepository.findOneOrFail(usuarioId);

    } catch (e) {
      return res.status(404).json({

        message: 'Usuario no encontrado'

      });
    }

    usuario.id = id;
    usuario.nombre = nombre;
    usuario.email = email;
    usuario.role = role;

    const errors = await validate(usuario, { validateError: { Targer: false, value: false } });

    if (errors.length > 0) {
      res.status(400).json(errors);
    }

    try {

      await usuarioRepository.save(usuario);

    } catch (e) {
      return res.status(409).json({
        message: 'El usuario ya esta en uso'
      });

    }

    res.status(201).json({ message: 'El usuario ya esta actualizado' });
  }

  static deleteUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;
    const usuarioRepository = getRepository(Usuario);
    let usuario: Usuario;
    try {

      usuario = await usuarioRepository.findOneOrFail(id);

    } catch (e) {

      res.status(404).json({

        message: 'Usuario no encontrado'

      });

    }

    usuarioRepository.delete(id);
    res.status(201).json({
      message: 'El usuario fue eliminado correctamente'
    });

  }

}

export default UsuarioController;