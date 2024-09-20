const { DataTypes } = require('sequelize');
const sequelize = require('../database'); 


const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
 FirstName:{
 type: DataTypes.STRING,
    allowNull: false
  },

  LastName: {
    type: DataTypes.STRING,
    allowNull: false
  },

email:{
 type: DataTypes.STRING,
    allowNull: false
    
  },

password:{
    type: DataTypes.STRING,
       allowNull: false
     },

DateofBirth:{
        type: DataTypes.STRING,
           allowNull: false
         },

Gender:{
            type: DataTypes.STRING,
               allowNull: false
             },

PhoneNumber:{
                type: DataTypes.STRING,
                   allowNull: false
                 },
                });

                module.exports = User;