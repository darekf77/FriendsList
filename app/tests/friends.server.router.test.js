'use strict';

var should = require('should'),
    request = require('supertest'),
    app = require('../../server'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Friends = mongoose.model('Friends'),
    agent = request.agent(app);

/**
 * Globals
 */
var user1, user2;

/**
 * Article routes tests
 */
describe('Friends CRUD tests', function() {
    beforeEach(function(done) {

        // Create a new user
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

        // Save a user to the test db and create new article
        user1.save(function() {
            user2.save(function(err) {
                done(err);
            });
        });
    });

    it('should do add friend , display list, remove without problems ', function(done) {

        var query_add_friend = '/friends/' + user1._id.toString() + '/' + user2._id.toString();
        console.log(query_add_friend);
        agent.post(query_add_friend)
            .expect(200)
            .end(function(addFriendErr, addFriendRes) {
                // Handle signin error
                if (addFriendErr) done(addFriendErr);

                // check if user 1 have friend
                var query_get_friend_list = '/friends/' + user1._id.toString();
                console.log(query_get_friend_list);
                agent.get(query_get_friend_list)
                    .expect(200)
                    .end(function(friendListErr, friendsListRes) {
                        // Handle article save error
                        if (friendListErr) done(friendListErr);

                        friendsListRes.should.have.length(1);

                        var query_remove_friend = '/friends/' + user1._id.toString() + '/' + user2._id.toString();
                        console.log(query_remove_friend);
                        agent.delete(query_remove_friend)
                            .expect(200)
                            .end(function(deleteFriendErr, deleteFriendRes) {
                                // Handle article save error
                                if (friendListErr) done(deleteFriendErr);

                                agent.get(query_get_friend_list)
                                    .expect(200)
                                    .end(function(friendListErr2, friendsListRes2) {
                                        // Handle article save error
                                        if (friendListErr2) done(friendListErr2);

                                        friendsListRes2.should.have.length(0);

                                        done()
                                    });
                            });
                    });
            });
        done()
    });

    afterEach(function(done) {
        User.remove().exec();
        done();
    });
});