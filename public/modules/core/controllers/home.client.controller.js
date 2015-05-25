'use strict';


angular.module('core').controller('HomeController', [
    '$scope', 'Authentication', 'Users', 'Friends',
    function($scope, Authentication, Users, Friends) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.currentUser = [];

        $scope.activateUser = function( user ) {
        	angular.forEach( $scope.users, function(v,k) {
        		v.active = false;
        		if( user._id === v._id ) {
        			v.active = true;
        			$scope.currentUser = v;
        		} 
        	} );

        };
   		
   		$scope.getFriends = function(user) {
   			user.friends = Friends.query({ id: user._id });   			
   			
   		};


        $scope.refreshFriendshipAndActivate = function( user ) {
        	console.info("AFTER QUERY");
        	angular.forEach( $scope.users, function(v,k) {
        		$scope.getFriends(v);
        	} );
        	$scope.activateUser(user);
        }
        
    	$scope.users = Users.query(function(){
        	 $scope.refreshFriendshipAndActivate($scope.users[0]);
        }); 



        
       

        

   		$scope.deleteFriend = function(user,friend) {
   			Friends.delete( { id: user._id, id2: friend._id },function() {
   				console.log('FRIEND DELETED!');
   				var index = user.friends.indexOf(friend);
   				console.log('index ' , index);
   				if (index > -1) {
					    user.friends.splice(index, 1);
					}
   			} );
   		};

   		$scope.addFriend = function(user1,user2) {
   			var friends = new Friends();
   			friends.data = {
   				user1_id: user1._id,
   				user2_id: user2._id
   			};
   			Friends.save( friends ,function() {
   				console.log('FRIEND SAVED!');
   			} );
   		};



    }
]);