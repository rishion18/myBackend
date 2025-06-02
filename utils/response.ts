import { ERROR_CODES } from "../constants/errorCodes.js";

export const sendSuccess = (
  res: any,
  data: any,
  message = "Success",
  statusCode = ERROR_CODES.SUCCESS
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};
