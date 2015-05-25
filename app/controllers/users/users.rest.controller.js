'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors.server.controller'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User'),
	config = require('../../../config/config'),
	nodemailer = require('nodemailer'),
	async = require('async'),
	crypto = require('crypto');



/**
 * List of Friends
 */
exports.list = function(req, res) {

    User.find({}, function(err, users) {

        if (err) {
            res.status(400).send(err);
            return;
        }

        res.json(users);        

    });

};