module.exports = (sequelize, DataTypes) => {

    const Supplier = sequelize.define("supplier", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contact:{
            type: DataTypes.STRING
        }

    })

    return Supplier

}