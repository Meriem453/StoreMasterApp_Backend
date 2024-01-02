module.exports = (sequelize, DataTypes) => {

    const ProductGroup = sequelize.define("productgroup", {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })

    return ProductGroup

}