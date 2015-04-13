var Schema, Skill, mongoose, skillSchema;
//var sequelize = require('sequelize')
mongoose = require('mongoose');


// var Skill = sequelize.define('skill', {
//   name: {
//     type: sequelize.STRING,
//     field: 'name' 
//   },
//   image: {
//     type: sequelize.STRING,
//     field: 'image'
//   }
// }, {
//   // freezeTableName: true // Model tableName will be the same as the model name
// });


Schema = mongoose.Schema;

skillSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  users: [
    {
      type: Schema.ObjectId,
      ref: "User"
    }
  ]
});

Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;
