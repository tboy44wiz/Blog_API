'use strict';

import { Router } from "express";
import UsersController from "../controllers/users_controller";

//  Set up Express ROuter.
const usersRouter = Router();


//  SignUp User.
usersRouter.post('/signup', UsersController.signUpUser);

//  Login User.
usersRouter.post('/login', UsersController.loginUser);

export default usersRouter;