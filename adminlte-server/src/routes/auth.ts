import { Router } from "express";
import AuthController from "../controller/AuthController";
//para trabajar con el cambio de password
import { checkJwt } from "../middleware/jwt";
const router=Router();


//login
router.post('/login', AuthController.login);

// Change Password
router.post('/change-password', [checkJwt], AuthController.changePassword);



export default router;