import { Router } from "express";
import AuthController from "../../controllers/authController.js";  
import { validate } from "../../helpers/validationHelper.js";
import { VALIDATORS } from "../../validators/index.js";

const authController = new AuthController();


 const authRouter = Router();

 authRouter.post("/sign-up", validate(VALIDATORS.USER), authController.signUp );
 authRouter.post("/login",validate(VALIDATORS.LOGIN), authController.login );

 export default authRouter;
