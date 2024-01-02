module.exports = (sequelize, DataTypes) => {

    const ExpDate = sequelize.define("expdate", {
        date: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true
        }

    })

    return ExpDate

}