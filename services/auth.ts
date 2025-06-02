import { ERROR_CODES } from "../constants/errorCodes.js";
import { Request } from "express";
import { generateToken } from "../helpers/tokenGenerator.js";
import { AppError } from "../middlewares/errorHandler.js";
import User from "../models/users.model.js";
import { UTILS } from "../utils/index.js";

class AuthService {

async signUp(req: Request) {
  try {
    const {
      name,
      email,
      password,
      phone,
      address,
      userName,
      role,
      fcmToken,
      deviceId,
    } = req.body;

    const hashedPassword = password ? await UTILS.HASH_PASSWORD(password) : undefined;

    const createBody = {
      name,
      email,
      phone,
      ...(hashedPassword && { password: hashedPassword }),
      ...(address && { address }),
      ...(userName && { userName }),
      ...(role && { role }),
      ...(fcmToken && { fcmTokens: [fcmToken] }),
      ...(deviceId && { deviceIds: [deviceId] }),
    };

    const user = await User.create(createBody);
    return user
  } catch (error) {
    throw error;
  }
}

async login(req: Request) {
  try{

    const {email, password, fcmToken, deviceId, loginType} = req.body;
    const user = await User.findOne({
      email: email,
    })
    if(!user){
      throw new AppError("User not found", ERROR_CODES.NOT_FOUND )
    }
    //comparing password 
    const isPasswordCorrect = await UTILS.VERIFY_PASSWORD(password, user.password);
    if(!isPasswordCorrect){
      throw new AppError("Invalid credentials", ERROR_CODES.BAD_REQUEST)
    }

    if(fcmToken){
      user.fcmTokens.push(fcmToken)
    }
    if(deviceId){
      user.deviceIds.push(deviceId)
    }
    await user.save()
    //generating token
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
      iat: Math.floor(Date.now() / 1000)
    }
    const token = generateToken(payload)
    return {
      user: user,
      token: token
    }
  }catch(error){
    throw error;
  }
}

}

export default AuthService