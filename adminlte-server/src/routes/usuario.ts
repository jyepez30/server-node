import { Router } from "express";
import UsuarioController from "../controller/UsuarioController";
import { checkJwt } from '../middleware/jwt';
import { checkRole } from "../middleware/role";


const router = Router(); 




//nota General: se debe agregar el  [checkJwt] antes de UsuarioController.xxxxx

//garantiza que nadie puede accesar sino esta logueado

// router.get('/', UsuarioController.getAll); linea anterior

// router.get('/', [checkJwt], checkRole(['admin']),   UsuarioController.getAll);

// router.get('/',    UsuarioController.getAll);

//**********************************************/
//sin incryptacion ni chequeo de rol 
// router.post('/',UsuarioController.newUsuario); 
//**********************************************/

// Get all usuarios
router.get('/', [checkJwt], checkRole(['admin']),   UsuarioController.getAll)



// Get one usuario
router.get('/:id',[checkJwt], checkRole(['admin']),  UsuarioController.getById);

//New Usuario
router.post('/',[checkJwt], checkRole(['admin']),  UsuarioController.newUsuario);


//Edit usuario
router.put('/:id',[checkJwt], checkRole(['admin']),  UsuarioController.editUsuario);

// Delete usuario
router.delete('/:id',[checkJwt], checkRole(['admin']),  UsuarioController.deleteUsuario);


export default router;