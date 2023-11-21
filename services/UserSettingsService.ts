import { Op } from "sequelize";
import { UserSettings } from "../server/models/entities/UserSettings";
import { SettingsForm } from "../server/models/SettingsModel";

class UserSettingsService {

    getSettingsByUserId = async (user_id: number) => {
        const allSettings = await UserSettings.findAll({
            where: {
                user_id: {
                    [Op.eq]: user_id
                }
            }
        })
        if (allSettings.length !== 0) {
            return allSettings[0];
        }
        return null;
    }

    changeInterfaceSettings = async (user_id: number, sound: boolean, fullscreen: boolean) => {
        const allSettings = await UserSettings.findAll({
            where: {
                user_id: {
                    [Op.eq]: user_id
                }
            }
        });
        if (allSettings.length !== 0) {
            const settings = allSettings[0];
            settings.fullscreen = fullscreen;
            settings.sound = sound;
            try {
                await settings.save();
                return true;
            }
            catch (ignored) {
                return false;
            }
        }
        else {
            const newSettings = UserSettings.build({ user_id: user_id, fullscreen: fullscreen, sound: sound });
            try {
                await newSettings.save();
                return true;
            }
            catch (ignored) {
                return false;
            }
        }
    }

    changeChatSettings = async (user_id: number, history: boolean, historyLength: number) => {
        const allSettings = await UserSettings.findAll({
            where: {
                user_id: {
                    [Op.eq]: user_id
                }
            }
        });
        if (allSettings.length !== 0) {
            const settings = allSettings[0];
            settings.history = history;
            settings.historyLength = historyLength;
            try {
                await settings.save();
                return true;
            }
            catch (ignored) {
                return false;
            }

        }
        else {
            const newSettings = UserSettings.build({ user_id: user_id, history: history, historyLength: historyLength });
            try {
                await newSettings.save();
                return true;
            }
            catch (ignored) {
                return false;
            }
        }
    }
}

export const settingsService = new UserSettingsService();