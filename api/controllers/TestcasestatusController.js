/**
 * TestcasestatusController
 *
 * @description :: Server-side logic for managing testcasestatuses
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    create: function(req, res, next) {

        var params = req.params.all();

        testcase.create(params, function(err, testcasestatus) {

            if (err) return next(err);

            res.status(201);

            res.json(testcasestatus);

        });

    }
};

