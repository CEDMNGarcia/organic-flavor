import sequelize from "./db.js";
import { DataTypes } from "sequelize";

// Importar modelos após definir as associações
import User from "./user.js";
import Wholesaler from "./wholesaler.js";
import Products from "./products.js";
import Bakers from "./pastryChefs.js";
import Deliveries from "./deliveries.js"; 

const Orders = sequelize.define('orders', {
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
                throw new Error('O pedido deve estar associado a um usuário, a um atacadista, ou a um confeiteiro, mas não a mais de um.');
            }
        },
        afterUpdate: async (order, options) => {
            console.log(`O status do pedido #${order.id} foi atualizado para: ${order.status}`);
            
            if (order.status === 'entregue') {
                try {
                    const delivery = await Deliveries.create({
                        userId: order.userId,
                        wholesalerId: order.wholesalerId,
                        pastryChefId: order.pastryChefId,
                        productId: order.productId,
                        orderDate: order.orderDate,
                        status: order.status
                    });
                    console.log(`Entrega criada:`, delivery);
                } catch (error) {
                    console.error('Erro ao criar entrega:', error.message);
                }
            }
        }
    }
});

Orders.belongsTo(User, { foreignKey: 'userId' });
Orders.belongsTo(Wholesaler, { foreignKey: 'wholesalerId' });
Orders.belongsTo(Bakers, { foreignKey: 'pastryChefId' });
Orders.belongsTo(Products, { foreignKey: 'productId' });

Orders.sync({ alter: true })
    .then(() => console.log("Orders table synced successfully"))
    .catch(err => console.log("Error syncing table: ", err));

export default Orders;

