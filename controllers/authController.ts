
import { asyncHandler } from "../middlewares/asyncHandler.js";
import AuthService from "../services/auth.js";
import { sendSuccess } from "../utils/response.js";


class AuthController {
  private authService: InstanceType<typeof AuthService>;

  constructor() {
    this.authService = new AuthService();
  }

 signUp = asyncHandler(async(req, res, _) => {
    const user = await this.authService.signUp(req);
    return sendSuccess(res, user, "User created successfully");
 })

 login = asyncHandler(async(req, res, _) => {
    const {user, token} = await this.authService.login(req);
 
    //cookie
    res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict', 
    maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
  });

    return sendSuccess(res, {user, token}, "User created successfully");
 })

}

export default AuthController
