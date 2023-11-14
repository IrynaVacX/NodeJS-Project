import { Op } from "sequelize";
import { User } from "../server/models/entities/User";

class UserService {

    addNewUser = async (login: string, password: string) => {
        try {
            const addResult = User.build({ name: login, password: password });
            await addResult.save();
        }
        catch (error) {
            console.log(`UserService(addNewUser): ${error}`);
            return false;
        }
        return true;
    }

    deleteUser = async (login: string) => {
        try {
            await User.destroy({
                where: {
                    id: {
                        [Op.eq]: login
                    }
                }
            })
        }
        catch (error) {
            console.log(`UserService(deleteUser): ${error}`);
            return false;
        }
        return true;
    }

    checkUserExist = async (login: string) => {
        try {
            let result = await User.findAll({
                where: {
                    name: {
                        [Op.eq]: login
                    }
                }
            });
            if (result.length >= 1) {
                return true;
            }
        }
        catch (error) {
            return null;
        }
        return false;
    }

    getUserByCredentials = async (login: string, password: string) => {
        try {
            const users = await User.findAll({
                where: {
                    [Op.and]: [
                        { name: login },
                        { password: password }
                    ]
                }
            });
            if (users.length !== 0) {
                return users[0];
            }
        }
        catch (error) {
            console.log(`UserService(addNewUser): ${error}`);
        }
        return null;
    }

}

export const userService = new UserService();

