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
		ref: 'User',
		required: true
	},
	user2_id: {
		type: Number,
		ref: 'User',
		required: true
	}
});



FriendsSchema.index({
    user1_id: 1,
    user2_id: 1
}, {
    unique: true,
    dropDups: true
});




mongoose.model('Friends', FriendsSchema);