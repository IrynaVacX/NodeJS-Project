import express from "express"
import { index, loader, register, menu, game_room } from "../controllers/homeController";

const homeRouter = express.Router();

homeRouter.get('/', index);
homeRouter.get('/loader',loader);
homeRouter.get('/registration', register);
homeRouter.get('/menu',menu);
homeRouter.get('/game-room',game_room);

// homeRouter.post('/registration', async (req, res) => {
//     const { dataToValidate } = req.body;
  
//     const validation = await validateData(dataToValidate);
  
//     res.json(validation);
// });
// async function validateData(dataToValidate) {
//     try {
//       const [rows] = await connection.execute('SELECT COUNT(*) as count FROM your_table WHERE column_name = ?', [dataToValidate]);
//       const count = rows[0].count;
  
//       if (count === 0) {
//         return { isValid: true, message: 'Данные прошли валидацию' };
//       } else {
//         return { isValid: false, message: 'Данные уже существуют в базе данных' };
//       }
//     } catch (error) {
//       return { isValid: false, message: 'Произошла ошибка при проверке данных' };
//     }
//   }
  
export { homeRouter }
