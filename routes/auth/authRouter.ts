import { Router } from "express";
import AuthController from "../../controllers/authController";  
import { validate } from "../../helpers/validationHelper";
import { VALIDATORS } from "../../validators";

const authController = new AuthController();


 const authRouter = Router();

 authRouter.post("/sign-up", validate(VALIDATORS.USER), authController.signUp );
 authRouter.post("/login",validate(VALIDATORS.LOGIN), authController.login );

 export default authRouter;
