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
}, {
    unique: true,
    dropDups: true
});


// FriendsSchema.pre('save', function(next) {

//     /**
//      * Function is checking if users are in database
//      * @param  {ObjectId} user1_id
//      * @param  {ObjectId} user2_id
//      */
//     function checkIfUsersExist(user1_id, user2_id) {
//         var User = mongoose.model('User', user.UserSchema);
//         User.find({
//             $or: [{
//                 _id: user1_id
//             }, {
//                 _id: user2_id
//             }]
//         }, function(err, users) {
//             if (err) {
//                 next(err)
//                 return;
//             }
//             if (users) {
//                 if (users.length == 2) {
//                     next();
//                     return;
//                 }
//             }
//             var err = new Error('User Not Exist');
//             next(err);
//         });
//     }

//     checkIfUsersExist(this.user1_id, this.user2_id);


// })


FriendsSchema.plugin(autoIncrement.mongoosePlugin);

mongoose.model('Friends', FriendsSchema);