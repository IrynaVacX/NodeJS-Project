import { Op } from "sequelize";
import { GlobalChat } from "../server/models/entities/GlobalChat";
import { sequelize } from "../server/db2";

class GlobalChatService {

    addNewMessage = async (name: string | null, message: string) => {
        try {
            const addResult = GlobalChat.build({ name: name, message: message });
            await addResult.save();
        }
        catch (error) {
            console.log(`GlobalChatService(addNewMessage): ${error}`);
            return false;
        }
        return true;
    }

    deleteMessages = async () => {
        try {
            await GlobalChat.destroy();
        }
        catch (error) {
            console.log(`GlobalChatService(deleteMessages): ${error}`);
            return false;
        }
        return true;
    }

    getMessagesAsArrayLimit = async (limit: number) => {
        try {
            const messages = await GlobalChat.findAll({
                order: sequelize.literal('id DESC'),
                limit: limit
            });
            if (messages.length !== 0) {
                let result: { id: number, name: string, message: string, createdAt: Date }[] = [];
                messages.forEach((el) => {
                    result.push({
                        id: el.id,
                        name: el.name,
                        message: el.message,
                        createdAt: el.createdAt
                    })
                })
                return result.reverse();
            }
        }
        catch (error) {
            console.log(`GlobalChatService(getMessages): ${error}`);
        }
    }

    getMessagesAsArray = async () => {
        try {
            const messages = await GlobalChat.findAll();
            if (messages.length !== 0) {
                let result: { id: number, name: string, message: string, createdAt: Date }[] = [];
                messages.forEach((el) => {
                    result.push({
                        id: el.id,
                        name: el.name,
                        message: el.message,
                        createdAt: el.createdAt
                    })
                })
                return result;
            }
        }
        catch (error) {
            console.log(`GlobalChatService(getMessages): ${error}`);
        }
        return null;
    }

}

export const globalChatService = new GlobalChatService();