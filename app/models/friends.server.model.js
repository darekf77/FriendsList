'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	autoIncrement = require('mongodb-autoincrement');

/**
 * Friends Schema
 */
var FriendsSchema = new Schema({
	user1_id: {
		type: Number,
		ref: 'User'
	},
	user2_id: {
		type: Number,
		ref: 'User'
	}
});

FriendsSchema.plugin(autoIncrement.mongoosePlugin);

mongoose.model('Friends', FriendsSchema);