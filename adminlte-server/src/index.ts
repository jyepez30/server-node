import "reflect-metadata";
import {createConnection} from "typeorm";

// 
import * as express from "express";

//es para que tengamos comunicacion en las cabeceras http 
//con nuestro front que en este caso es la plantilla adminlte
import * as cors from 'cors';


//para que tengamos seguridad en las cabeceras http entre el back y el front permite hacer los enlaces mas seguros 
import * as helmet from "helmet";

import {Request, Response} from "express";

import routes from "./routes/index";
// import {User} from "./entity/User";


//variable de entorno para nuestra conex del servidor
const PORT = process.env.PORT || 3000;

createConnection().then(async connection => {


//Esta constante manejara todas las funcionalidades de Express

 // create express app
  const app = express(); 

  //middlewares 
  app.use(cors());
  app.use(helmet()); 
  app.use(express.json()); 

  //Rutas
  app.use('/',routes);

 
  //aca hacemos el llamado para que nuestro servidor se active 
 // start express server
  app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

}).catch(error => console.log(error));
