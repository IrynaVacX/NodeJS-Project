import express from "express"
import { index, loader, register, menu, game_room, game_war, registerNewUser } from "../controllers/homeController";

const homeRouter = express.Router();

homeRouter.get('/', index);
homeRouter.get('/loader', loader);
homeRouter.get('/registration', register);
homeRouter.get('/menu', menu);
homeRouter.get('/game-room', game_room);
homeRouter.get('/war-area', game_war);
homeRouter.post('/registration', registerNewUser);
export { homeRouter }
