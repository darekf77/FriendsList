'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Friends = mongoose.model('Friends'),
    _ = require('lodash');

/**
 * Create a Friend
 */
exports.create = function(req, res) {

    if (parseInt(req.params.user1_id) === parseInt(req.params.user2_id)) {
        var err = new Error('Same values not allowed');
        res.status(400).send(err.message);
    }

    Friends.create(
        [{
            user1_id: parseInt(req.params.user1_id),
            user2_id: parseInt(req.params.user2_id)
        }, {
            user1_id: parseInt(req.params.user2_id),
            user2_id: parseInt(req.params.user1_id)
        }],
        function(err, small) {
            if (err) {
                res.status(400).send(err.message);
                return;
            }
            res.json(req.params);
        });
};



/**
 * Delete an Friend
 */
exports.delete = function(req, res) {

    if (parseInt(req.params.user1_id) === parseInt(req.params.user2_id)) {
        var err = new Error('Same values not allowed');
        res.status(400).send(err.message);
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