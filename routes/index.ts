import { Router } from "express";
import authRoutes from "./auth/authRouter.js";

const router = Router();

router.use("/auth", authRoutes);

export default router;

