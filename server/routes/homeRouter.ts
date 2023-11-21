import express, { NextFunction, Request, Response } from "express"
import { index, loader, register, menu, game_room, game_war, registerNewUser, authUser, logoutUser, getUsername, setChatSettings, setInterfaceSettings, getChatSettings, getInterfaceSettings, getChatHistory } from "../controllers/homeController";

const homeRouter = express.Router();

function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    // @ts-ignore
    if (req.session.user) {
        next();
    }
    else {
        res.redirect('/registration')
    }
}

homeRouter.get('/', index);
homeRouter.get('/loader', loader);
homeRouter.get('/registration', register);
homeRouter.get('/menu', isAuthenticated, menu);
homeRouter.get('/game-room', isAuthenticated, game_room);
// homeRouter.get('/game-room', game_room);
homeRouter.get('/war-area', isAuthenticated, game_war);
homeRouter.post('/registration', registerNewUser);
homeRouter.post('/auth', authUser);
homeRouter.get('/logout', logoutUser);
homeRouter.get('/profile', getUsername);
homeRouter.post('/setchatsettings', setChatSettings);
homeRouter.post('/setinterfacesettings', setInterfaceSettings);
homeRouter.get('/getchatsettings', getChatSettings);
homeRouter.get('/getinterfacesettings', getInterfaceSettings);
homeRouter.get('/getchathistory',getChatHistory);
export { homeRouter }
