'use strict';

import Joi from 'joi';

const roles = ['admin', 'user'];

class JoiValidator {

    /*=====================================================================================*/
    /*=================================== FOR USERS =====================================*/
    //  Users Validation Schema.
    static usersSignupSchema = Joi.object({
        name: Joi.string().required().min(3),
        phone: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
            .error(new Error("Password must be at least 6 characters and alphanumeric.")),
        role: Joi.string().required().valid(...roles),
        description: Joi.string(),
        social_media: Joi.array()
    });

    //  Users Update Validation Schema.
    static usersUpdateSchema = Joi.object({
        name: Joi.string().min(3),
        phone: Joi.string(),
        email: Joi.string().email(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
            .error(new Error("Password must be at least 6 characters and alphanumeric.")),
        role: Joi.string().valid(...roles),
        description: Joi.string(),
        social_media: Joi.array()
    });

    //  User Login Validation Schema.
    static usersLoginSchema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    });
}

export default JoiValidator;