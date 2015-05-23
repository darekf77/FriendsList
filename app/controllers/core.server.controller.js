'use strict';

/**
 * Module dependencies.
 */
exports.index = function(req, res) {
    res.render('index', {
        user: req.user || null,
        request: req
    });
};



exports.apidocs = function( req, res ) {
	res.send('sieemamaaaa');
};

exports.hej = function(req, res) {
	res.send('hej');

    // var options = {
    //     root: __dirname,
    //     dotfiles: 'deny',
    //     headers: {
    //         'x-timestamp': Date.now(),
    //         'x-sent': true
    //     }
    // };

    // var fileName = '../docs/testdoc.md';
    // res.sendFile(fileName, options, function(err) {
    //     if (err) {
    //         console.log(err);
    //         res.status(err.status).end();
    //     } else {
    //         console.log('Sent:', fileName);
    //     }
    // });

};