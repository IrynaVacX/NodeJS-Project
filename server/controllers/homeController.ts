import { Request, Response } from "express";
import { FieldErrorMessageModel } from "../models/FieldErrorMessageModel";
import { ResponseModel } from "../models/ResponseModel";
import { userService } from "../../services/UserService";

let responseBody: ResponseModel;
let contentType = 'application/json';

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
    const { login, password } = req.body;
    if (typeof login === 'undefined' || typeof password === 'undefined') {
        responseBody = {
            status: 400,
            statusMessage: 'Missing required params: \'login\', \'password\'',
            data: undefined
        };
        sendResponse(res, responseBody.status, JSON.stringify(responseBody), contentType);
        return;
    }
    let validationResult = await validateRegFields(login, password);
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
        await userService.addNewUser(login, password);
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
export const authUser = async (req: Request, res: Response, next) => {
    // @ts-ignore
    if(req.session.user){
        responseBody = {
            status: 400,
            statusMessage: 'Already authorized',
            data: undefined
        };
        sendResponse(res, responseBody.status, JSON.stringify(responseBody), contentType);
        return;
    }
    const { login, password } = req.body;
    if (typeof login === 'undefined' || typeof password === 'undefined') {
        responseBody = {
            status: 400,
            statusMessage: 'Missing required params: \'login\', \'password\'',
            data: undefined
        };
        sendResponse(res, responseBody.status, JSON.stringify(responseBody), contentType);
        return;
    }
    let validationResult = validateAuthFields(login, password);
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
        let searchResult = await userService.getUserByCredentials(login, password);
        if (searchResult === null) {
            responseBody = {
                status: 401,
                statusMessage: 'Wrong login or password',
                data: undefined
            };
            sendResponse(res, responseBody.status, JSON.stringify(responseBody), contentType);
            return;
        }
        req.session.regenerate((err) => {
            // @ts-ignore
            req.session.user = {
                userId: searchResult?.id,
                login: searchResult?.name
            };
            req.session.save((err) => {
                res.redirect('/menu');
            })
        })
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


    // responseBody = {
    //     status: 201,
    //     statusMessage: 'Ok',
    //     data: undefined
    // };
    // sendResponse(res, responseBody.status, JSON.stringify(responseBody), contentType);
}
export const logoutUser = (req: Request, res: Response) => {
    // @ts-ignore
    if (!req.session.user) {
        responseBody = {
            status: 401,
            statusMessage: 'Unauthorized',
            data: undefined
        };
        sendResponse(res, responseBody.status, JSON.stringify(responseBody), contentType);
        return;
    }
    // @ts-ignore
    req.session.user = null;
    req.session.save((err) => {
        req.session.regenerate((err) => {
            res.redirect('/registration');
        })
    })
}
export const getUsername = (req: Request, res: Response) => {
    contentType = 'application/json'
    // @ts-ignore
    if (!req.session.user) {
        responseBody = {
            status: 401,
            statusMessage: 'Unauthorized',
            data: null
        }
        sendResponse(res, responseBody.status, JSON.stringify(responseBody), contentType);
        return;
    }
    responseBody = {
        status: 200,
        statusMessage: 'Ok',
        // @ts-ignore
        data: req.session.user.login
    }
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
    // @ts-ignore
    if (req.session.user) {
        res.render('menu', {
            layout: "index",
        })
        return;
    }
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