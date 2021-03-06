define({ "api": [
  {
    "type": "post",
    "url": "/friends",
    "title": "Create",
    "name": "CreateFriendship",
    "group": "Friends",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "user1_id",
            "description": "<p>Users unique ID.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "user2_id",
            "description": "<p>New friend id -&gt; users unique ID.</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Array</p> ",
            "optional": false,
            "field": "-",
            "description": "<p>with user's id's</p> "
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "-",
            "description": "<p>Errors messages.</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/friends.server.routes.js",
    "groupTitle": "Friends"
  },
  {
    "type": "delete",
    "url": "/friends/:user1_id/:user2_id",
    "title": "Delete",
    "name": "Deleteriendship",
    "group": "Friends",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "user1_id",
            "description": "<p>Users unique ID.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "user2_id",
            "description": "<p>Friend to delete -&gt; users unique ID.</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Array</p> ",
            "optional": false,
            "field": "-",
            "description": "<p>with user's id's</p> "
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "-",
            "description": "<p>Errors messages.</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/friends.server.routes.js",
    "groupTitle": "Friends"
  },
  {
    "type": "get",
    "url": "/friends/:user1_id/:user2_id",
    "title": "List",
    "name": "ListOfUSerFriends",
    "group": "Friends",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "user_id",
            "description": "<p>Users unique ID.</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Array</p> ",
            "optional": false,
            "field": "-",
            "description": "<p>with  user's friends data</p> "
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "-",
            "description": "<p>Errors messages.</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/friends.server.routes.js",
    "groupTitle": "Friends"
  },
  {
    "type": "get",
    "url": "/users",
    "title": "List",
    "name": "ListOfLast20Users",
    "group": "Users",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Array</p> ",
            "optional": false,
            "field": "-",
            "description": "<p>with  user's data (last 20 users)</p> "
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "-",
            "description": "<p>Errors messages.</p> "
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/users.server.routes.js",
    "groupTitle": "Users"
  }
] });