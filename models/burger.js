var orm = require("../config/orm.js");

var burger = {
  // SELECT * FROM burgers;
  selectAll: function(callback) {
    orm.selectAll("burgers", function(results) {
      callback(results);
    });
  },

  // The variables cols and vals are arrays
  insertOne: function(columns, values, callback) {
    orm.insertOne("burgers", columns, values, function(results) {
      callback(results);
    });
  },

  updateOne: function(objectOfColumnValues, condition, callback) {
    orm.updateOne("burgers", objectOfColumnValues, condition, function(
      results
    ) {
      callback(results);
    });
  }
};

// exporting the burger object that interacts with the burgers table in the burgers_db to the burgers_controllers.js
module.exports = burger;
