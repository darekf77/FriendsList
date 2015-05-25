
'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Friends', ['$resource',
    function($resource) {
        return $resource('friends/:id/:id2');
    }
]);