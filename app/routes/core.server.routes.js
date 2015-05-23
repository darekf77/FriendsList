'use strict';

var express = require('express');

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core.server.controller');
	app.route('/').get(core.index);

	// app.route('/api/docs').get(core.apidocs);

	app.use('/api/docs',express.static('public/apidoc'));

	app.route('/hej').get(core.hej);
};