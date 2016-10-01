'use strict';

var Person            = require('../models/person'),
    config            = require('../../config');

module.exports = function(app, express) {

    // get an instance of the express router
    var apiRouter = express.Router();

    // test route to make sure everything is working
    apiRouter.get('/', function(req, res) {
        return res.json(
            {
                success: true,
                message: 'Hello there. You made it to a route!'
            }
        );
    });

    // Person route /person
    // Just an example to show one how to enter with POST request.
    apiRouter.route('/person')
        .post(function(req, res) {

            // quick console.log check to see what came into the request body
            //console.log(req.body);

            var person = new Person();

            person.nickname             = req.body.nickname;
            person.firstname            = req.body.firstname;
            person.lastname             = req.body.lastname;

            // save the person and check for errors.  Res
            person.save(function(err) {
                if (err) {
                    return res.send(
                        {
                            success: false,
                            error: err,
                            message: 'Person not saved into the database.'
                        }
                    );
                } else {
                    res.json({
                      success: true,
                      message: 'Person saved into the database!'
                    });
                }
            });

        });

    // ------------------------------------------------------------------------------

    return apiRouter;

};
