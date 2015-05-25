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
var user1,user2,data;

/**
 * Unit tests
 */
describe('Friends Model Unit Tests:', function() {
	beforeEach(function(done) {
		user1 = new User({
            firstName: 'Full1',
            lastName: 'Name1',
            displayName: 'Full Name1',
            email: 'test1@test.com',
            username: 'username1',
            password: 'password1',
            provider: 'local'
        });

        user2 = new User({
            firstName: 'Full',
            lastName: 'Name',
            displayName: 'Full Name',
            email: 'test2@test.com',
            username: 'username2',
            password: 'password2',
            provider: 'local'
        });

		user1.save(function() { 
			user2.save(function() { 
				data = {
                    user1_id: user1._id,
                    user2_id: user2._id
                };
                done();
			});
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			var friends = new Friends(data);
			friends.save(function(err) {
				should.not.exist(err);	
				done(err);			
			});
			
		});

		it('should not be able to save the same data again', function(done) {
			var friends = new Friends(data);
			var friends2 = new Friends(data);
			friends.save(function(err) {
				should.not.exist(err);	
				friends2.save(function(err2) {
					should.exist(err2);	
					done(err);
				});	
			});
		});

	});

	afterEach(function(done) { 
		Friends.remove().exec();
		User.remove().exec();

		done();
	});
});