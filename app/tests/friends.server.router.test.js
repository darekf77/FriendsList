'use strict';

/*!
3		 * Connect - utils
4		 * Copyright(c) 2010 Sencha Inc.
5		 * Copyright(c) 2011 TJ Holowaychuk
6		 * MIT Licensed
7		 */


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

    it('should be able to get a list of users friends ', function(done) {
        // Create new article model instance
        var friendsObj = new Friends({
            user1_id: user1._id,
            user2_id: user2._id
        });

        // Save the article
        friendsObj.save(function() {
            // Request articles
            request(app).get('/friends/' + user1._id)
                .end(function(req, res) {
                    // Set assertion
                    res.body.should.be.an.Array.with.lengthOf(1);
                    res.body[0]._id.should.be.exactly(user2._id);

                    // Call the assertion callback
                    done();
                });

        });
    });


    it('shoudl return empty table', function(done) {
        var query_get_friend_list = '/friends/' + user1._id.toString();
        // console.log(query_get_friend_list);
        agent.get(query_get_friend_list)
            .expect(200)
            .end(function(err, friendsRes) {
                if (err) done(err);
                friendsRes.body.should.have.length(0);
                done();
            });
    });


    it('shoudl return error ', function(done) {
        agent.get('/friends/AAA')
            .expect(400)
            .end(function(err, friendsRes) {                
                done();
            });
    });

    it('shoudl return error ', function(done) {
        agent.get('/friends/-1')
            .expect(400)
            .end(function(err, friendsRes) {                
                done();
            });
    });

    it('shoudl return becouse bad parameters ', function(done) {
        agent.post('/friends')
            .expect(400)
            // .send({ data: {
            // 	user1_id: user1._id,
            // 	user2_id: user2._id
            // }})
            .end(function(err, friendsRes) {                
                done();
            });
    });


    // it('should do add friend , display list, remove without problems ', function(done) {

    //     var query_add_friend = '/friends/' + user1._id.toString() + '/' + user2._id.toString();
    //     // console.log(query_add_friend);
    //     agent.post(query_add_friend)
    //     	.send({
    //     		user1_id : user1._id,
    //     		user2_id : user2._id
    //     	})
    //         .expect(200)
    //         .end(function(addFriendErr, addFriendRes) {
    //             // Handle signin error
    //             if (addFriendErr) done(addFriendErr);

    //             // check if user 1 have friend
    //             var query_get_friend_list = '/friends/' + user1._id.toString();
    //             // console.log(query_get_friend_list);
    //             agent.get(query_get_friend_list)
    //                 .expect(200)
    //                 .end(function(friendListErr, friendsListRes) {
    //                     // Handle article save error
    //                     if (friendListErr) done(friendListErr);

    //                     friendsListRes.body.should.have.length(1);

    //                     var query_remove_friend = '/friends/' + user1._id.toString() + '/' + user2._id.toString();
    //                     // console.log(query_remove_friend);
    //                     agent.delete(query_remove_friend)
    //                         .expect(200)
    //                         .end(function(deleteFriendErr, deleteFriendRes) {
    //                             // Handle article save error
    //                             if (friendListErr) done(deleteFriendErr);

    //                             agent.get(query_get_friend_list)
    //                                 .expect(200)
    //                                 .end(function(friendListErr2, friendsListRes2) {
    //                                     // Handle article save error
    //                                     if (friendListErr2) done(friendListErr2);

    //                                     friendsListRes2.body.should.have.length(0);

    //                                     done();
    //                                 });
    //                         });
    //                 });
    //         });
    // });	

    afterEach(function(done) {
        User.remove().exec();
        Friends.remove().exec();
        done();
    });
});