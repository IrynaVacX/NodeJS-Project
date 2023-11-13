import { Request, Response } from "express";
import { FieldErrorMessageModel } from "../models/FieldErrorMessageModel";
import { ResponseModel } from "../models/ResponseModel";
import { userService } from "../../services/UserService";


const sendResponse = (res: Response, statusCode: number, data: string, contentType: string) => {
    res.statusCode = statusCode;
    res.setHeader("Content-Type", contentType);
    res.send(data);
}
const validateAuthFields = (login: string, password: string) => {
    let isValid = true;
    let errorMessage: FieldErrorMessageModel[] = [];
    if (login.trim().length === 0) {
        isValid = false;
        errorMessage.push({ fieldName: 'login', errorMessage: 'Login is empty' });
    }
    if (password.trim().length === 0) {
        isValid = false;
        errorMessage.push({ fieldName: 'password', errorMessage: 'Password is empty' });
    }
    return { errorList: errorMessage, isValid: isValid };
}
const validateRegFields = async (login: string, password: string) => {
    let isValid = true;
    let errorMessage: FieldErrorMessageModel[] = [];
    if (login.trim().length === 0) {
        isValid = false;
        errorMessage.push({ fieldName: 'login', errorMessage: 'Login is empty' });
    }
    let existResult = await userService.checkUserExist(login);
    if (existResult) {
        isValid = false;
        errorMessage.push({ fieldName: 'login', errorMessage: 'User already exist' });
    }
    if (password.trim().length === 0) {
        isValid = false;
        errorMessage.push({ fieldName: 'password', errorMessage: 'Password is empty' });
    }
    return { errorList: errorMessage, isValid: isValid };
}
export const registerNewUser = async (req: Request, res: Response) => {
    const data = req.body;
    let responseBody: ResponseModel;
    let contentType = "application/json";
    if (typeof data.login === 'undefined' || typeof data.password === 'undefined') {
        responseBody = {
            status: 400,
            statusMessage: 'Missing required params: \'login\', \'password\'',
            data: undefined
        };
        sendResponse(res, responseBody.status, JSON.stringify(responseBody), contentType);
        return;
    }
    let validationResult = await validateRegFields(data.login, data.password);
    if (!validationResult.isValid) {
        responseBody = {
            status: 403,
            statusMessage: 'Validation error',
            data: validationResult.errorList
        };
        sendResponse(res, responseBody.status, JSON.stringify(responseBody), contentType);
        return;
    }
    try {
        await userService.addNewUser(data.login, data.password);
    }
    catch (err) {
        responseBody = {
            status: 500,
            statusMessage: 'Server error. Check server logs',
            data: undefined
        };
        console.error("[ERR]registerNewUser: ", err);
        sendResponse(res, responseBody.status, JSON.stringify(responseBody), contentType);
        return;
    }
    responseBody = {
        status: 201,
        statusMessage: 'Created',
        data: undefined
    };
    sendResponse(res, responseBody.status, JSON.stringify(responseBody), contentType);
}
export const authUser = async (req: Request, res: Response) => {
    const data = req.body;
    let responseBody: ResponseModel;
    let contentType = "application/json";
    if (typeof data.login === 'undefined' || typeof data.password === 'undefined') {
        responseBody = {
            status: 400,
            statusMessage: 'Missing required params: \'login\', \'password\'',
            data: undefined
        };
        sendResponse(res, responseBody.status, JSON.stringify(responseBody), contentType);
        return;
    }
    let validationResult = validateAuthFields(data.login, data.password);
    if (!validationResult.isValid) {
        responseBody = {
            status: 403,
            statusMessage: 'Validation error',
            data: validationResult.errorList
        };
        sendResponse(res, responseBody.status, JSON.stringify(responseBody), contentType);
        return;
    }
    try {
        let searchResult = await userService.getUserByCredentials(data.login, data.password);
        if (searchResult === null) {
            responseBody = {
                status: 401,
                statusMessage: 'Wrong login or password',
                data: undefined
            };
            sendResponse(res, responseBody.status, JSON.stringify(responseBody), contentType);
            return;
        }
    }
    catch (err) {
        responseBody = {
            status: 500,
            statusMessage: 'Server error. Check server logs',
            data: undefined
        };
        console.error("[ERR]authUser: ", err);
        sendResponse(res, responseBody.status, JSON.stringify(responseBody), contentType);
        return;
    }
    responseBody = {
        status: 201,
        statusMessage: 'Ok',
        data: undefined
    };
    sendResponse(res, responseBody.status, JSON.stringify(responseBody), contentType);
}
export const index = (req: Request, res: Response) => {
    res.render('main', {
        layout: 'index'
    })
}
export const loader = (req: Request, res: Response) => {
    res.render('loader', {
        layout: "index",
    })
}
export const menu = (req: Request, res: Response) => {
    res.render('menu', {
        layout: "index",
    })
}
export const register = (req: Request, res: Response) => {
    res.render('reg', {
        layout: 'index'
    })
}
export const game_room = (req: Request, res: Response) => {
    res.render('game-room', {
        layout: 'index'
    })
}
export const game_war = (req: Request, res: Response) => {
    res.render('war-area', {
        layout: 'index'
    })
}