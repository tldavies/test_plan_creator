/**
 * TestcaseController
 *
 * @description :: Server-side logic for managing testcases
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    // a CREATE action
    create: function(req, res, next) {

        var params = req.params.all();

        Testcase.create(params, function(err, testcase) {

            if (err) return next(err);

            res.status(201);

            res.json(testcase);

        });

    },

    //Find action - finds the testcase ID from the testcase name. If it cant
    //find the testcase then creates a new one.
    findbyname: function(req, res, next) {
      //  console.log("req = " + req);

        var name = req.param('name');

        Testcase.findByName(name)
            .exec( function createIfNotFoundTestcase (err, test) {
                if (err) {
                    // We set an error header here,
                    // which we access in the views an display in the alert call.
                    res.set('error', 'DB Error');
                    // The error object sent below is converted to JSON
                    res.send(500, { error: "DB Error" });
                } else if (test) {
                    // Found the test of the name
                    res.json(test);
                } else {
                    //Create a new TestCase with the name
                    this.create(req, res, next);
                }
            });
   },

    findAll: function (req, res) {
        Testcase.find().exec(function (err, testcases) {
            if (err) {
                res.send(400);
            } else {
                res.send(testcases);
            }
        });
    },

    getstatusesbyid: function (req, res) {
        var id = req.parm();
    }





};

