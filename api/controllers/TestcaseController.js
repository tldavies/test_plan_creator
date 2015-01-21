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
    find: function(req, res, next) {
        var name = req.params('name');

        Testcase.findOneByName(name)
            .done( function createIfNotFoundTestcase (err, test) {
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
                    create(req, res, next);
                }
            });
    }







};

