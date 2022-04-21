'use strict';

import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';

// import models from '../database/models';
const models = require("../database/models");
import Response from '../utils/response';
import JoiValidator from "../utils/joi_validator";

const { User } = models;


class UserController {
    
    //  User SignUp.
    static signUpUser = async (req, res) => {
        try {

            const requestBody = req.body;

            //  Validate the Request Body.
            const { error, value } = JoiValidator.usersSignupSchema.validate(requestBody);
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            //  Check if Staff already exist and create a new Staff using the "value" gotten from the validated object.
            const [user, created] = await User.findOrCreate({
                where: { email: value.email },
                defaults: { ...value }
            });
            if (!created) {
                const response = new Response(
                    false,
                    409,
                    "User already exist."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                201,
                "Successfully created a user.",
                { user }
            );
            return res.status(response.code).json(response);

        }catch (error) {
            console.log(`ERROR::: ${ error }`);
            const response = new Response(
                false,
                500,
                "Server error, please try again later."
            );
            res.status(response.code).json(response);
        }
    };


    //  User Login.
    static loginUser = async (req, res) => {
        try {

            const requestBody = req.body;

            //  Validate the Request Body.
            const { error, value } = JoiValidator.usersLoginSchema.validate(requestBody);
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            const user = await User.findOne({
                where: { email: value.email }
            });

            if (!user) {
                const response = new Response(
                    false,
                    404,
                    "Email or Password is not correct."
                );
                return res.status(response.code).json(response);
            }

            //  Compare the encrypted password.
            const isPasswordMatched = bcrypt.compareSync(value.password, user.password );
            if (!isPasswordMatched) {
                const response = new Response(
                    false,
                    401,
                    "Incorrect password. Check your password or use 'Forget password' option."
                );
                return res.status(response.code).json(response);
            }

            const { id, name, phone, email, role } = user;

            //  Create a Token that will be passed to the response.
            const token = await jwt.sign(
                { id, name, phone, email, role },
                `${ process.env.JWT_SECRET_KEY }`,
                { expiresIn: "30d" }
            );

            const formattedResponse = {
                ...user.dataValues,
                token
            }

            const response = new Response(
                true,
                200,
                "You're logged in successfully.",
                { user: formattedResponse }
            );
            res.status(response.code).json(response);

        }catch (error) {
            console.log(`ERROR::: ${ error }`);
            const response = new Response(
                false,
                500,
                "Server error, please try again later."
            );
            res.status(response.code).json(response);
        }
    };
}

export default UserController;