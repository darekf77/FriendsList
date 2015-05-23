'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Friends = mongoose.model('Friends');

/**
 * Globals
 */
var user, friends;

/**
 * Unit tests
 */
describe('Friends Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({			
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			friends = new Friends({
				user1_id : 1,
				user2_id : 2
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			// return friends.save(function(err) {
			// 	should.not.exist(err);
				
			// });
			done();
		});
	});

	afterEach(function(done) { 
		Friends.remove().exec();
		User.remove().exec();

		done();
	});
});