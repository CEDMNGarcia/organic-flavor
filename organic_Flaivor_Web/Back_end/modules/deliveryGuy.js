import sequelize from "./db.js";
import { DataTypes } from "sequelize";

const DeliveryGuy = sequelize.define('delivery_guy', {
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
    birthdate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    vehicle: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false 
    }
});

DeliveryGuy.sync({ alter: true });

export default DeliveryGuy;
