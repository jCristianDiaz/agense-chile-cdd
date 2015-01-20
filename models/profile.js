/**
 * Created by cdiaz on 19-01-15.
 */

"use strict";

module.exports = function(sequelize, DataTypes) {
    var Profile = sequelize.define("Profile", {
        name: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                Profile.hasMany(models.User);
            }
        }
    });

    return Profile;
};