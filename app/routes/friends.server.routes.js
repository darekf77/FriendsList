'use strict';

module.exports = function(app) {
    // Routing logic   
    var users = require('../../app/controllers/users.server.controller');
    var friends = require('../../app/controllers/friends.server.controller');

    // fruends stuff
    app.route('/friends/:user1_id/:user2_id')
        .post(friends.create);

    app.route('/friends/:user1_id/:user2_id')
        .delete(friends.delete);

    app.route('/friends/:user_id')
        .get(friends.list);

    // app.param('user1_id', users.userByID);
    // app.param('user2_id', users.userByID);
    // app.param('user_id', users.userByID);



};