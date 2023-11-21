import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../db2";
class UserSettings extends Model {
    declare id: number;
    declare user_id: number;
    declare sound: boolean;
    declare fullscreen: boolean;
    declare history: boolean;
    declare historyLength: number;
};

UserSettings.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id'
        }
    },
    sound: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    fullscreen: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    history: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    historyLength: {
        type: DataTypes.INTEGER,
        defaultValue: 999
    },
}, {
    sequelize: sequelize,
    freezeTableName: true,
    tableName: 'UserSettings',
    timestamps: false
});

await UserSettings.sync();
export { UserSettings };