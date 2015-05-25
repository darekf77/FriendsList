'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Friends = mongoose.model('Friends'),
    _ = require('lodash');
    var bodyParser = require('body-parser');

/**
 * Create a Friend
 */
exports.create = function(req, res) {

    var err;
    if ( typeof req.body.data === 'undefined' )  {
        err = new Error('Bad request parameters');
        res.status(400).send(err.message);
        return;
    }

    if (parseInt(req.body.data.user1_id) === parseInt(req.body.data.user2_id)) {
        err = new Error('Same values not allowed');
        res.status(400).send(err.message);
        return;
    }

    Friends.create(
        [{
            user1_id: parseInt(req.body.data.user1_id),
            user2_id: parseInt(req.body.data.user2_id)
        }, {
            user1_id: parseInt(req.body.data.user2_id),
            user2_id: parseInt(req.body.data.user1_id)
        }],
        function(err, small) {
            if (err) {
                res.status(400).send(err.message);
                return;
            }
            res.json(req.body.data);
        });
};



/**
 * Delete an Friend
 */
exports.delete = function(req, res) {

    var err;

    if ( typeof req.params.user1_id === 'undefined'  || typeof req.params.user2_id === 'undefined') {

        err = new Error('Bad request parameters');
        res.status(400).send(err.message);
        return;
    }

    if (parseInt(req.params.user1_id) === parseInt(req.params.user2_id)) {
            err = new Error('Same values not allowed');
        res.status(400).send(err.message);
        return;
    }

    Friends.remove({
        $or: [{
            user1_id: parseInt(req.params.user1_id),
            user2_id: parseInt(req.params.user2_id)
        }, {
            user1_id: parseInt(req.params.user2_id),
            user2_id: parseInt(req.params.user1_id)
        }]
    }, function(err) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.json(req.params);
    });


};



/**
 * List of Friends
 */
exports.list = function(req, res) {

    if ( typeof req.params.user_id === 'undefined' )  {
        var err = new Error('Bad request parameter');
        res.status(400).send(err.message);
        return;
    }

    Friends.find({
        user1_id: parseInt(req.params.user_id)
    }, function(err, friends) {

        if (err) {
            res.status(400).send(err);
            return;
        }
        if (friends.length === 0) {
            res.json([]);
            return;
        }

        var totalToProcess = friends.length;
        var users = [];

        var t_fn = function(err, user) {
            totalToProcess -= 1;
            if (totalToProcess === 0 && err) {
                res.json(users);
                return;
            }
            if (err) return;

            users.push(user);

            if (totalToProcess === 0) {
                res.json(users);
                return;
            }
        };

        for (var i = 0; i < friends.length; ++i) {
            User.findOne({
                _id: parseInt(friends[i].user2_id)
            }, t_fn);
        }

    });

};