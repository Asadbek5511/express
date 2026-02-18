import { Router } from "express";
import controllerRouter from './user.route.js'

const router = Router();

router.use('/users', controllerRouter)

export default router;