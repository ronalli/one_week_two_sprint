import {param} from "express-validator";

export const validatorParamId = param('id')
    .isMongoId().withMessage('Filed id is not valid mongo')