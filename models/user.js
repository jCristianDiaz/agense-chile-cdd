/**
 * Created by cdiaz on 19-01-15.
 */


module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                User.belongsTo(models.Profile)
                User.belongsTo(models.Holding)
            }
        }
    });

    return User;
};