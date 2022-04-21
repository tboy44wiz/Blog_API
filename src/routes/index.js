'use strict';

import { Router } from "express";

//  Import all the required routes.
import userRouter from "./users_route";

//  Initialize Express Router.
const router = Router();

//  Use routes.
router.use('/user', userRouter);

export default router;