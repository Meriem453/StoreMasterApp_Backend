module.exports = (sequelize, DataTypes) => {

    const Category = sequelize.define("category", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true
        },


    })

    return Category

}