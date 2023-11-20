import { Op } from "sequelize";
import { UserSettings } from "../server/models/entities/UserSettings";
import { SettingsForm } from "../server/models/SettingsModel";

class UserSettingsService {
    changeChatSettings = async (settingsForm: SettingsForm) => {
        const allSettings = await UserSettings.findAll({
            where: {
                user_id: {
                    [Op.eq]: settingsForm.user_id
                }
            }
        });
        if (allSettings.length !== 0) {
            const settings = allSettings[0];
            settings.sound = settingsForm.sound === null ? settings.sound : settingsForm.sound;
            settings.fullscreen = settingsForm.fullscreen === null ? settings.fullscreen : settingsForm.fullscreen;
            settings.history = settingsForm.history === null ? settings.history : settingsForm.history;
            settings.historyLength = settingsForm.historyLength === null ? settings.historyLength : settingsForm.historyLength;
            try {
                await settings.save();
                return true;
            }
            catch (ignored) {
                return false;
            }
        }
        else {
            
        }
    }
}