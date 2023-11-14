import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../db2";

class GlobalChat extends Model {
    declare id: number;
    declare name: string;
    declare message: string;
    declare createdAt: Date;
    declare deletedAt: Date;
}

GlobalChat.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'user'
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'message'
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
},
    {
        sequelize: sequelize,
        tableName: "GlobalChat",
        freezeTableName: true,
        timestamps: false
    });

await GlobalChat.sync();
export { GlobalChat };

