
import { Sequelize, DataTypes }  from 'sequelize';

const db = new Sequelize({
    dialect: 'sqlite',
    storage: './dota.sqlite'
});

const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
    }
});

const Hero = db.define('Hero', {
    name: {
        type: DataTypes.STRING,
    }
});

const Guide = db.define('Guide', {
    description: {
        type: DataTypes.STRING,
    }
});

const Items = db.define('Items', {
    name: {
        type: DataTypes.STRING,
    }, 

    price: {
        type: DataTypes.INTEGER,
    },

    recipe: {
        type: DataTypes.INTEGER,
    }
});

const PurchaseOrder = db.define('PurchaseOrder', {
    description: {
        type: DataTypes.STRING,
    },
})

const File = db.define("File",{
    imagenCodificada: {
        type: DataTypes.TEXT
    },
    mimeType: {
        type: DataTypes.STRING
    },
    size: {
        type: DataTypes.INTEGER
    }
})

User.belongsToMany(Hero, {through: Guide})
Hero.belongsToMany(User, {through: Guide})
User.hasOne(File, {as: "userAvatar"})
File.belongsTo(User, {as: "userAvatar"})


User.hasMany(Guide)
Guide.belongsTo(User)

Hero.hasMany(Guide)
Guide.belongsTo(Hero)
Hero.hasOne(File, {as: "heroAvatar"})
File.belongsTo(Hero, {as: "heroAvatar"})

Guide.hasMany(PurchaseOrder)
PurchaseOrder.belongsTo(Guide)

Items.belongsToMany(PurchaseOrder, {through: "ItemsPurchaseOrder"})
PurchaseOrder.belongsToMany(Items, {through: "ItemsPurchaseOrder"})
Items.hasOne(File, {as: "imageItem"})
File.belongsTo(Items, {as: "imageItem"})

//await db.sync({ alter: true })
await db.sync()

export {
    Items,
    PurchaseOrder,
    User,
    Hero,
    Guide,
    File
}

/*
app.post("/tarefa/", async (peticion, respuesta)=>{
    try {
        const tarefa = await Tarefa.create(peticion.body)
        respuesta.setHeader("Content-Type", "application/json")
        respuesta.status(201)
        respuesta.send(tarefa.toJSON())
    } catch (error) {
        respuesta.status(500)
        respuesta.send('Error.')
    }
})

app.get("/tarefa/", async (peticion, respuesta)=>{
    if (peticion.query.id) {
        try {
            const tarefa = await Tarefa.findByPk(peticion.query.id)
            respuesta.setHeader("Content-Type", "application/json")
            respuesta.status(200)
            respuesta.send(tarefa.toJSON()) 
        } catch (error) {
            respuesta.status(500)
            respuesta.send('Error.')
        }
    } else  {
        try {
            const todasAsTarefas = await Tarefa.findAll()
            respuesta.setHeader("Content-Type", "application/json")
            respuesta.status(200)
            respuesta.send(JSON.stringify(todasAsTarefas))
        } catch (error) {
            respuesta.status(500)
            respuesta.send('Error.')
        }
    }
})

app.put("/tarefa/", async (peticion, respuesta)=>{
    try {
        const tarefa = await Tarefa.findByPk(peticion.body.id)
        await tarefa.update(peticion.body)
        respuesta.status(200)
        respuesta.send("Ok")        
    } catch (error) {
        respuesta.status(500)
        respuesta.send('Error.')
    }
})

app.delete("/tarefa/", async (peticion, respuesta)=>{
    try {
        const tarefa = await Tarefa.findByPk(peticion.body.id)
        await tarefa.destroy()
        respuesta.status(200)
        respuesta.send("Ok")        
    } catch (error) {
        respuesta.status(500)
        respuesta.send('Error.')
    }
})


*/