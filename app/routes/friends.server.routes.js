'use strict';

module.exports = function(app) {
    // Routing logic   
    var users = require('../../app/controllers/users.server.controller');
    var friends = require('../../app/controllers/friends.server.controller');

    // var bodyParser = require('body-parser');
    // app.use(bodyParser.json());
    /**
     * @api {post} /friends Create
     * @apiName CreateFriendship
     * @apiGroup Friends
     *
     * @apiParam {Number} user1_id Users unique ID.
     * @apiParam {Number} user2_id New friend id -> users unique ID.
     *
     * @apiSuccess {Array} - with user's id's
     * @apiError - Errors messages.
     * 
     */
    app.route('/friends')
        .post(friends.create);

    /**
     * @api {delete} /friends/:user1_id/:user2_id Delete
     * @apiName Deleteriendship
     * @apiGroup Friends
     *
     * @apiParam {Number} user1_id Users unique ID.
     * @apiParam {Number} user2_id Friend to delete -> users unique ID.
     *
     * @apiSuccess {Array} - with user's id's
     * @apiError - Errors messages.
     * 
     */
    app.route('/friends/:user1_id([0-9]+)/:user2_id([0-9]+)')
        .delete(friends.delete);

    /**
     * @api {get} /friends/:user1_id/:user2_id List
     * @apiName ListOfUSerFriends
     * @apiGroup Friends
     *
     * @apiParam {Number} user_id Users unique ID.
     *
     * @apiSuccess {Array} - with  user's friends data
     * 
     */
    app.route('/friends/:user_id([0-9]+)')
        .get(friends.list);

    app.param('user1_id', users.userByID);
    app.param('user2_id', users.userByID);
    app.param('user_id', users.userByID);



};