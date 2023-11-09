import { Request, Response } from "express";
import { FieldErrorMessageModel } from "../models/FieldErrorMessageModel";
import { connection } from "../db";

const checkUserExistence = async (user: string) => {
    let result = await connection.query("SELECT COUNT(*) as Users FROM Users AS u WHERE u.name = ?", [user]);
    return result[0][0].Users;
}

const sendResponse = (res: Response, statusCode: number, data: string, contentType: string) => {
    res.statusCode = statusCode;
    res.setHeader("Content-Type", contentType);
    res.send(data);
}

const validateFields = async (login: string, password: string) => {
    let isValid = true;
    let errorMessage: FieldErrorMessageModel[] = [];
    if (login.trim().length === 0) {
        isValid = false;
        errorMessage.push({ fieldName: 'login', errorMessage: 'Login is empty' });
    }
    else if (login.length > 15) {
        isValid = false;
        errorMessage.push({ fieldName: 'login', errorMessage: 'Login max length: 15 symbols' });
    }
    else if (await checkUserExistence(login) > 1) {
        isValid = false;
        errorMessage.push({ fieldName: 'login', errorMessage: 'User already exist' });
    }

    if (password.trim().length === 0) {
        isValid = false;
        errorMessage.push({ fieldName: 'password', errorMessage: 'Password is empty' });
    }
    else if (password.length > 15) {
        isValid = false;
        errorMessage.push({ fieldName: 'password', errorMessage: 'Password max length: 15 symbols' });
    }
    return { errorList: errorMessage, isValid: isValid };

}

export const registerNewUser = async (req: Request, res: Response) => {
    const data = req.body;
    let responseBody = {};
    let contentType = "application/json";
    if (!data.login || !data.password) {
        responseBody = {
            status: 400,
            statusMessage: 'Missing required params: \'login\', \'password\''
        };
        sendResponse(res, 400, JSON.stringify(responseBody), contentType);
        return;
    }
    let validationResult = await validateFields(data.login, data.password);
    if (!validationResult.isValid) {
        responseBody = {
            status: 403,
            statusMessage: 'Validation error',
            data: validationResult.errorList
        };
        sendResponse(res, 400, JSON.stringify(responseBody), contentType);
        return;
    }
    try {
        await connection.query(`INSERT INTO Users (name,password)
            VALUES (?,?)`, [data.login, data.password]);
    }
    catch (err) {
        responseBody = {
            status: 500,
            statusMessage: 'Server error. Check server logs'
        };
        console.log("Database Insert Error: ", err);
        sendResponse(res, 500, JSON.stringify(responseBody), contentType);
        return;
    }
    responseBody = {
        status: 201,
        statusMessage: 'Created'
    };
    sendResponse(res, 201, JSON.stringify(responseBody), contentType);
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
