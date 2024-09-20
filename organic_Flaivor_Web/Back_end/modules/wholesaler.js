import sequelize from "./db.js";
import { DataTypes } from "sequelize";

const Wholesaler = sequelize.define('wholesaler', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    CNPJ: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

Wholesaler.sync({ alter: true });

export default Wholesaler;
