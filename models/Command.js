module.exports = (sequelize, DataTypes) => {

    const Command = sequelize.define("command", {
        datetime: {
            type: DataTypes.STRING,
            allowNull: false,

        },


    })

    return Command

}