import {body} from "express-validator";

const validatorLogin = body('login')
    .trim()
    .notEmpty().withMessage('Field login is empty')
    .isString().withMessage('Field login is not correct')
    .isLength({
        min: 3, max: 10
    }).withMessage('Login filed should be min 3 and max 10 symbols').custom(value => {
        const regex = new RegExp('^[a-zA-Z0-9_-]*$');
        return regex.test(value);
    }).withMessage('Field login is not correct');

const validatorPassword = body('password').trim()
    .notEmpty().withMessage('Field password is empty')
    .isString().withMessage('Field password is not correct')
    .isLength({
        min: 6, max: 20
    }).withMessage('Password filed should be min 6 and max 20 symbols')

const validatorEmail = body('email').trim()
    .notEmpty().withMessage('Field email is empty')
    .isString().withMessage('Field email is not correct')
    .custom(value => {
        const regex = new RegExp('^[\w.-]+@([\w-]+\.)+[a-z]{2,4}$')
        return regex.test(value)
    }).withMessage('Field email is not correct')


export const validationInputBodyUser = [validatorLogin, validatorPassword, validatorEmail]