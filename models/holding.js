/**
 * Created by cdiaz on 19-01-15.
 */

"use strict";

module.exports = function(sequelize, DataTypes) {
    var Holding = sequelize.define("Holding", {
        name: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                Holding.hasMany(models.User);
            }
        }
    });

    return Holding;
};