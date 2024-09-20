import express from "express";
import User from "./modules/user.js";
import bcrypt from 'bcrypt';
import validarToken from "./middlewares/auth.js";
import jwt from 'jsonwebtoken';
import cors from "cors";
import DeliveryGuy from "./modules/deliveryGuy.js";
import Wholesaler from "./modules/wholesaler.js";
import Products from "./modules/products.js";
import Orders from "./modules/orders.js";
import Bakers from "./modules/pastryChefs.js";
import Deliveries from "./modules/deliveries.js";

const app = express()

app.use(express.json())

app.use((req, res, next) => {

    res.header("Access-Control-Allow-Origin", "*")

    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")

    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization")

    app.use(cors())
    next()

})

/* -------------------------- Comandos de usuario -------------------------- */
/* Cadastrar usuario */
app.post('/user', async (req, res) => {

    var dados = req.body

    dados.password = await bcrypt.hash(dados.password, 8)

    await User.create(dados).then(() => {

        return res.json({
            error: false,
            mensagem: "Usuario foi cadastrado com sucesso!"

        })

    }).catch(() => {

        return res.json({
            error: true,
            mensagem: "Usuario não cadastrado "

        })
    })

})
/* /Cadastrar usuario/ */

/* Mostrar todos os usuarios */
app.get('/users', async (req, res) => {
    await User.findAll().then((users) => {
        return res.json({
            error: false,
            users
        })
    }).catch(() => {
        return res.json({
            error: true,
            mensagem: "Doesn't is posible get all"
        })
    })
})
/* /Mostrar todos os usuarios/ */

/* Deletar usuario */
app.delete('/users/:id', async (req, res) => {

    const { id } = req.params
    await User.destroy({
        where: {
            id: id
        }
    })
        .then((users) => {

            return res.json({

                error: false,
                mensagem: "Tabela deletada com sucesso",
                users

            })

        }).catch(() => {

            return res.json({

                error: true,
                mensagem: "Código não lido"

            })

        })

})
/* /Deletar usuario/ */

/* Alterar registro de usuario */
app.put('/users/:id', async (req, res) => {

    const { id } = req.params
    await User.update(req.body, {
        where: {
            id
        }
    })
        .then((users) => {

            return res.json({

                error: false,
                mensagem: "Registro alterado",
                users

            })

        }).catch(() => {

            return res.json({

                error: true,
                mensagem: "Registro não alterado"

            })

        })

})
/* /Alterar registro de usuario/ */
/* /-------------------------- Comandos de usuario --------------------------/ */

/* -------------------------- Comandos de entregador -------------------------- */
/* Cadastrar entregador */
app.post('/deliveryGuy', async (req, res) => {

    var dados = req.body

    dados.password = await bcrypt.hash(dados.password, 8)

    await DeliveryGuy.create(dados).then(() => {

        return res.json({
            error: false,
            mensagem: "Usuario foi cadastrado com sucesso!"

        })

    }).catch(() => {

        return res.json({
            error: true,
            mensagem: "Usuario não cadastrado "

        })
    })

})
/* /Cadastrar entregador/ */

/* Mostrar todos os entregadores */
app.get('/delivery_users', async (req, res) => {
    await DeliveryGuy.findAll().then((users) => {
        return res.json({
            error: false,
            users
        })
    }).catch(() => {
        return res.json({
            error: true,
            mensagem: "Doesn't is posible get all"
        })
    })
})
/* /Mostrar todos os entregadores/ */

/* Alterar registro de entregador */
app.put('/delivery_user/:id', async (req, res) => {

    const { id } = req.params
    await DeliveryGuy.update(req.body, {
        where: {
            id
        }
    })
        .then((users) => {

            return res.json({

                error: false,
                mensagem: "Registro alterado",
                users

            })

        }).catch(() => {

            return res.json({

                error: true,
                mensagem: "Registro não alterado"

            })

        })

})
/* /Alterar registro de entregador/ */

/* Deletar entregador */
app.delete('/delivery_user/:id', async (req, res) => {

    const { id } = req.params
    await DeliveryGuy.destroy({
        where: {
            id: id
        }
    })
        .then((users) => {

            return res.json({

                error: false,
                mensagem: "Tabela deletada com sucesso",
                users

            })

        }).catch(() => {

            return res.json({

                error: true,
                mensagem: "Código não lido"

            })

        })

})
/* /Deletar entregador/ */

/* /-------------------------- Comandos de entregador --------------------------/ */

/* -------------------------- Comandos de atacadão -------------------------- */
/* Cadastrar atacadão */
app.post('/wholesaler', async (req, res) => {

    var dados = req.body

    dados.password = await bcrypt.hash(dados.password, 8)

    await Wholesaler.create(dados).then(() => {

        return res.json({
            error: false,
            mensagem: "Usuario foi cadastrado com sucesso!"

        })

    }).catch(() => {

        return res.json({
            error: true,
            mensagem: "Usuario não cadastrado "

        })
    })

})
/* /Cadastrar atacadão/ */

/* Mostrar todos os atacadões */
app.get('/wholesaler', async (req, res) => {
    await Wholesaler.findAll().then((users) => {
        return res.json({
            error: false,
            users
        })
    }).catch(() => {
        return res.json({
            error: true,
            mensagem: "Doesn't is posible get all"
        })
    })
})
/* /Mostrar todos os atacadões/ */

/* Alterar registro de atacadão */
app.put('/wholesaler/:id', async (req, res) => {

    const { id } = req.params
    await Wholesaler.update(req.body, {
        where: {
            id
        }
    })
        .then((users) => {

            return res.json({

                error: false,
                mensagem: "Registro alterado",
                users

            })

        }).catch(() => {

            return res.json({

                error: true,
                mensagem: "Registro não alterado"

            })

        })

})
/* Alterar registro de atacadão */

/* Deletar atacadão */
app.delete('/wholesaler/:id', async (req, res) => {

    const { id } = req.params
    await Wholesaler.destroy({
        where: {
            id: id
        }
    })
        .then((users) => {

            return res.json({

                error: false,
                mensagem: "Tabela deletada com sucesso",
                users

            })

        }).catch(() => {

            return res.json({

                error: true,
                mensagem: "Código não lido"

            })

        })

})
/* /Deletar atacadão/ */

/* -------------------------- /Comandos de atacadão/ -------------------------- */

/* -------------------------- Comandos de Produtos -------------------------- */

/* Cadastrar produto */
app.post('/product', async (req, res) => {

    var dados = req.body

    await Products.create(dados).then(() => {

        return res.json({
            error: false,
            mensagem: "Produto cadastrado com sucesso!"

        })

    }).catch(() => {

        return res.json({
            error: true,
            mensagem: "Produto não cadastrado "

        })
    })

})
/* /Cadastrar produtos/ */

/* Mostrar todos os produtos */
app.get('/products', async (req, res) => {
    await Products.findAll().then((users) => {
        return res.json({
            error: false,
            users
        })
    }).catch(() => {
        return res.json({
            error: true,
            mensagem: "Doesn't is posible get all"
        })
    })
})
/* /Mostrar todos os produtos/ */

/* Alterar registro de produto */
app.put('/product/:id', async (req, res) => {

    const { id } = req.params
    await Products.update(req.body, {
        where: {
            id
        }
    })
        .then((products) => {

            return res.json({

                error: false,
                mensagem: "Registro alterado",
                products

            })

        }).catch(() => {

            return res.json({

                error: true,
                mensagem: "Registro não alterado"

            })

        })

})
/* Alterar registro de produto */

/* Deletar produto */
app.delete('/product/:id', async (req, res) => {

    const { id } = req.params
    await Products.destroy({
        where: {
            id: id
        }
    })
        .then((users) => {

            return res.json({

                error: false,
                mensagem: "Tabela deletada com sucesso",
                users

            })

        }).catch(() => {

            return res.json({

                error: true,
                mensagem: "Código não lido"

            })

        })

})
/* /Deletar produto/ */

/* -------------------------- /Comandos de Produtos/ -------------------------- */

/* -------------------------- Comandos de Confeiteiro -------------------------- */

/* Cadastrar Confeiteiro */
app.post('/baker', async (req, res) => {

    var dados = req.body

    dados.password = await bcrypt.hash(dados.password, 8)

    await Bakers.create(dados).then(() => {

        return res.json({
            error: false,
            mensagem: "Usuario foi cadastrado com sucesso!"

        })

    }).catch(() => {

        return res.json({
            error: true,
            mensagem: "Usuario não cadastrado "

        })
    })

})
/* /Cadastrar Confeiteiro/ */

/* Mostrar todos os confeiteiros */
app.get('/bakers', async (req, res) => {
    await Bakers.findAll().then((users) => {
        return res.json({
            error: false,
            users
        })
    }).catch(() => {
        return res.json({
            error: true,
            mensagem: "Doesn't is posible get all"
        })
    })
})
/* /Mostrar todos os confeiteiros/ */

/* Alterar registro de confeiteiro */
app.put('/baker/:id', async (req, res) => {

    const { id } = req.params
    await Bakers.update(req.body, {
        where: {
            id
        }
    })
        .then((users) => {

            return res.json({

                error: false,
                mensagem: "Registro alterado",
                users

            })

        }).catch(() => {

            return res.json({

                error: true,
                mensagem: "Registro não alterado"

            })

        })

})
/* Alterar registro de confeiteiro */

/* Deletar confeiteiro */
app.delete('/baker/:id', async (req, res) => {

    const { id } = req.params
    await Bakers.destroy({
        where: {
            id: id
        }
    })
        .then((users) => {

            return res.json({

                error: false,
                mensagem: "Tabela deletada com sucesso",
                users

            })

        }).catch(() => {

            return res.json({

                error: true,
                mensagem: "Código não lido"

            })

        })

})
/* /Deletar confeiteiro/ */

/* -------------------------- /Comandos de Confeiteiro/ -------------------------- */

/* -------------------------- Comandos de Pedido -------------------------- */

/* Fazer pedido */
app.post('/order', async (req, res) => {
    try {
        var dados = req.body;

        await Orders.create(dados);
        return res.json({
            error: false,
            mensagem: "Pedido efetuado com sucesso!"
        });
    } catch (error) {
        return res.json({
            error: true,
            mensagem: error.message || "Pedido não realizado"
        });
    }
});
/* /Fazer pedido/ */

/* Mostrar todos os pedidos */
app.get('/orders', async (req, res) => {
    await Orders.findAll().then((orders) => {
        return res.json({
            error: false,
            orders
        });
    }).catch(() => {
        return res.json({
            error: true,
            mensagem: "Não foi possível obter todos os pedidos"
        });
    });
});
/* /Mostrar todos os pedidos/ */

/* Mostrar um pedido especifico */
app.get('/order/:id', async (req, res) => {
    try {
        const order = await Orders.findOne({
            where: { id: req.params.id },
            include: [User, Wholesaler, Bakers, Products] // Inclua os modelos relacionados
        });
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json({ order });
    } catch (error) {
        res.status(500).json({ error: 'Server error', message: error.message });
    }
});
/* /Mostrar um pedido especifico/ */

/* Alterar registro de pedido */
app.patch('/order/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const [updated] = await Orders.update(req.body, {
            where: { id }
        });

        if (updated) {
            return res.json({
                error: false,
                mensagem: "Pedido atualizado com sucesso!"
            });
        }

        return res.json({
            error: true,
            mensagem: "Pedido não encontrado."
        });
    } catch (error) {
        return res.json({
            error: true,
            mensagem: error.message || "Erro ao atualizar o pedido."
        });
    }
});
/* Alterar registro de pedido */

/* Deletar pedido */
app.delete('/order/:id', async (req, res) => {
    const { id } = req.params;
    await Orders.destroy({
        where: {
            id: id
        }
    })
    .then(() => {
        return res.json({
            error: false,
            mensagem: "Pedido deletado com sucesso"
        });
    }).catch(() => {
        return res.json({
            error: true,
            mensagem: "Erro ao deletar o pedido"
        });
    });
});
/* /Deletar pedido/ */

/* -------------------------- /Comandos de Pedido/ -------------------------- */

/* -------------------------- Comandos de Entregas -------------------------- */

/* Mostrar todas as entregas */
app.get('/deliveries', async (req, res) => {
    try {
        const users = await Deliveries.findAll();
        res.json({
            error: false,
            users
        });
    } catch (error) {
        res.json({
            error: true,
            message: "Não foi possível obter as entregas",
            errorDetails: error.message
        });
    }
});

/* /Mostrar todas as entregas/ */

/* -------------------------- /Comandos de Entregas/ -------------------------- */

app.listen(8080, () => {
    console.log('Servidor iniciado na porta 8080: http://localhost:8080')
})