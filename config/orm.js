var connection = require("../config/connection.js");

// loops through and creates an array of question marks  - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objectToSQL(object) {
  var arr = [];

  for (var key in object) {
    var value = object[key];

    if (Object.hasOwnProperty.call(object, key)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {burger_name : 'Fried Chicken Burger'} => ["burger_name='Fried Chicken Burger'"]
      // e.g. {devoured: false} => ["devoured=false"]
      arr.push(key + "=" + value);
    }
  }

  return arr.toString();
}

var orm = {
  // Read
  selectAll: function(tableInput, callback) {
    var queryString = "SELECT * FROM " + tableInput + ";";

    connection.query(queryString, function(err, results) {
      if (err) throw err;

      callback(results);
    });
  },

  // Create
  insertOne: function(table, column, values, callback) {
    // values set number of question marks
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += column.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(values.length);
    queryString += ") ";

    // "INSERT INTO (column name) VALUES (?, ?)"
    console.log(queryString);

    connection.query(queryString, values, function(err, results) {
      // val replaces the question marks with the row values to add into the column
      if (err) throw err;

      callback(results);
    });
  },

  // Update
  updateOne: function(table, objectOfColumnValues, condition, callback) {
    // example of objectOfColumnValues {burger_name: Veggie Burger, devoured: false}
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objectToSQL(objectOfColumnValues);
    // [burger_name = Veggie Burger], [devoured = false]
    queryString += " WHERE ";
    queryString += condition;

    // "UPDATE tablename SET [columnname = rowvalue] WHERE condition"
    console.log(queryString);

    connection.query(queryString, function(err, results) {
      if (err) throw err;

      callback(results);
    });
  }
};

// Exporting the orm module for models (burger.js)
module.exports = orm;
