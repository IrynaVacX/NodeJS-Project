import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../db2";

class User extends Model {
    declare id: number;
    declare name: string;
    declare password: string;
    declare createdAt: Date;
    declare deletedAt: Date;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'name',
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 0
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    sequelize: sequelize,
    tableName: "Users",
    freezeTableName: true,
    timestamps: false
});

await User.sync();
export { User };