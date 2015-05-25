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
var user1, user2, data;

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
                data = {
                    user1_id: user1._id,
                    user2_id: user2._id
                };
            });
        });
    });

    describe('GET', function() {
        it('should be able to get a list of users friends ', function(done) {
            // Create new article model instance
            var friendsObj = new Friends(data);

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


        it('shoudl return empty table if user havent got friends', function(done) {
            agent.get('/friends/' + user1._id.toString())
                .expect(200)
                .end(function(err, friendsRes) {
                    if (err) done(err);
                    friendsRes.body.should.have.length(0);
                    done();
                });
        });


        it('shoudl return error when parameter is not a number', function(done) {
            agent.get('/friends/AAA')
                .expect(400)
                .end(function(err, friendsRes) {
                    done();
                });
        });

        it('shoudl return error when parameter is below zero or equal zero ', function(done) {
            agent.get('/friends/-1')
                .expect(400)
                .end(function(err, friendsRes) {
                    done();
                });
        });
    });


    describe('POST', function() {

        it('shoudl save friendship to database without problems ', function(done) {

            agent.post('/friends')
                .expect(200)
                .send({
                    data: data
                })
                .end(function(err, friendsRes) {
                    done(err);
                });
            Friends.remove(data);
        });

        it('shoudl return error if parameters are the same ', function(done) {
            var bad_data = {
                user1_id: user1._id,
                user2_id: user1._id
            };
            agent.post('/friends')
                .expect(400)
                .send({
                    data: bad_data
                })
                .end(function(err, friendsRes) {
                    done(err);
                });
        });

        it('shoudl return error if parameters are not exist ', function(done) {

            agent.post('/friends')
                .expect(400)
                .end(function(err, friendsRes) {
                    done(err);
                });
        });

    });

    describe('DELETE', function() {

        it('should delete users without problems', function(done) {

            var friendsObj = new Friends(data);
            friendsObj.save(function() {
                agent.delete('/friends/' + user1._id.toString() + '/' + user2._id.toString())
                    .expect(200)
                    .end(function(err, friendsRes) {

                        Friends.find({
                            user1_id: parseInt(user1._id)
                        }, function(err, friends) {

                            friends.should.have.length(0);
                            done(err);
                        });
                    });
            });
        });

        it('should  return errors becouse bad parameters', function(done) {

            var friendsObj = new Friends(data);
            friendsObj.save(function() {
                agent.delete('/friends/a/b')
                    .expect(404)
                    .end(function(err, friendsRes) {
                        done(err);
                    });
            });
        });

    });



    afterEach(function(done) {
        User.remove().exec();
        Friends.remove().exec();
        done();
    });
});