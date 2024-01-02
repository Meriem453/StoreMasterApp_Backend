module.exports = (sequelize, DataTypes) => {

    const Product = sequelize.define("product", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        benefit: {
            type: DataTypes.BIGINT,
            allowNull: false
        }
        ,
        barcode: {
            type: DataTypes.BIGINT,
             unique:true
        }
    
    })

    return Product

}