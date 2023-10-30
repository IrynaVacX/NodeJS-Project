import express from "express"
import { register, index, menu } from "../controllers/homeController";

const homeRouter = express.Router();

homeRouter.get('/registration', register);
homeRouter.get('/', index);
homeRouter.get('/menu',menu);

export { homeRouter }
