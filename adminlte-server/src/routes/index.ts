import { Router } from "express";
import usuario from "./usuario"
import auth from "./auth";


const routes = Router();
//localhost:3000/usuarios
routes.use('/usuarios', usuario);


// localhost:3000/auth/login
routes.use('/auth', auth);


export default routes;

























