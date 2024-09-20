import sequelize from "./db.js";
import { DataTypes } from "sequelize";

// Importar modelos após definir as associações
import User from "./user.js";
import Wholesaler from "./wholesaler.js";
import Products from "./products.js";
import Bakers from "./pastryChefs.js";

const Deliveries = sequelize.define('delivery', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        allowNull: true
    },
    wholesalerId: {
        type: DataTypes.INTEGER,
        references: {
            model: Wholesaler,
            key: 'id'
        },
        allowNull: true
    },
    pastryChefId: {  
        type: DataTypes.INTEGER,
        references: {
            model: Bakers,
            key: 'id'
        },
        allowNull: true
    },
    productId: {
        type: DataTypes.INTEGER,
        references: {
            model: Products,
            key: 'id'
        },
        allowNull: false
    },
    orderDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    hooks: {
        beforeCreate: (order, options) => {
            const { userId, wholesalerId, pastryChefId } = order;
            if ([userId, wholesalerId, pastryChefId].filter(Boolean).length !== 1) {
                throw new Error('A entrega deve estar associada a um usuário, a um atacadista, ou a um confeiteiro, mas não a mais de um.');
            }
        }
    }
}); 

Deliveries.belongsTo(User, { foreignKey: 'userId' });
Deliveries.belongsTo(Wholesaler, { foreignKey: 'wholesalerId' });
Deliveries.belongsTo(Bakers, { foreignKey: 'pastryChefId' });
Deliveries.belongsTo(Products, { foreignKey: 'productId' });

Deliveries.sync({ alter: true })
    .then(() => console.log("Deliveries table synced successfully"))
    .catch(err => console.log("Error syncing table: ", err));

export default Deliveries;  