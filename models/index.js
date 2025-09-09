const dbConfig = require('../config/dbConfig.js');

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB, {
        dialect: dbConfig.dialect,
        operatorsAliases: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

        }
    }
)

sequelize.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err => {
    console.log('Error'+ err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.products = require('./productModel.js')(sequelize, DataTypes)
db.expdate = require('./ExpDate.js')(sequelize, DataTypes)
db.command = require('./Command.js')(sequelize, DataTypes)
db.category = require('./Category.js')(sequelize, DataTypes)
db.productgroup = require('./ProductGroup.js')(sequelize, DataTypes)
db.supplier = require('./Supplier.js')(sequelize, DataTypes)



db.sequelize.sync({ force: false })
.then(() => {
    console.log('yes re-sync done!')
})



// 1 to Many Relation

db.products.belongsTo(db.supplier,{
    foreignKey:'supplier',
    as:'supplier_',
    allowNull:false,
    onDelete:"CASCADE",
    onUpdate:"CASCADE",
})

db.supplier.belongsTo(db.category,{
    foreignKey:'category',
    as:'category_',
    onDelete:"CASCADE",
    onUpdate:"CASCADE",
})

db.command.belongsTo(db.supplier,{
    foreignKey:'supplier',
    as:'supplier_',
    allowNull:false,
    onDelete:"CASCADE",
    onUpdate:"CASCADE",
})

db.command.belongsTo(db.expdate,{
    foreignKey:'expdate',
    as:'expdate_',
    allowNull:false,
    onDelete:"CASCADE",
    onUpdate:"CASCADE",
})

db.productgroup.belongsTo(db.products,{
    foreignKey:'product',
    as:'product_',
    allowNull:false,
    onDelete:"CASCADE",
    onUpdate:"CASCADE",

})

 db.productgroup.belongsTo(db.command,{
     foreignKey:'command',
     as:'command_',
     allowNull:false,
     onDelete:"CASCADE",
     onUpdate:"CASCADE",

 })

module.exports = db
