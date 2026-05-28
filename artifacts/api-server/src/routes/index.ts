import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import salesRouter from "./sales";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/auth", authRouter);
router.use(salesRouter);

export default router;
