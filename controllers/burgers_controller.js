var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js");

// Read from database and display to index
router.get("/index", function(req, res) {
  burger.selectAll(function(data) {
    var handlebarsObject = {
      // burgers referenced in the index.handlebars {{#each burgers}}
      // data is being referenced in index.hanldebars $(this).data("id");
      burgers: data
    };

    console.log(handlebarsObject);

    res.render("index", handlebarsObject);
  });
});

// Create a new row in database
router.post("/api/burgers", function(req, res) {
  burger.insertOne(
    // Column names
    ["burger_name", "devoured"],
    // Row Values from the request
    [req.body.burger_name, req.body.devoured],
    // Callback
    function(results) {
      res.json({ id: results.insertedId });
    }
  );
});

// Update the database when burger is devoured
router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.updateOne(
    {
      // Updating the devoured column in the database with the request sent from client
      devoured: req.body.devoured
    },
    condition,
    function(results) {
      // Error handling
      if (results.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    }
  );
});

// Export this module to server.js
module.exports = router;
