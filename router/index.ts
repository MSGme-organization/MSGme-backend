import { Router } from "express";
import messageRouter from "./messageRouter";
const router = Router();

router.use("/message", messageRouter);

export default router;
