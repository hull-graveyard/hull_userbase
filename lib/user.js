"use strict";
var client = require('hull').client();
var usersDatabase = {};

function User(attributes) {
  this.attributes = attributes;
  this.id     = attributes.id;
  this.email  = attributes.email;
  this.name   = attributes.name;
}

User.prototype = {
  get: function(attrs) {
    return this.attributes[attrs];
  },
  update: function(attrs) {
    this.attributes = attrs;
    return this;
  },
  save: function(callback) {
    client.put(this.id, this.attributes, callback);
  },
  destroy: function(callback) {
    client.delete(this.id, callback);
  }
};

User.find = function(userId) {
  var attrs = usersDatabase[userId];
  if (attrs) return new User(attrs);
};

User.create = function(attrs) {
  usersDatabase[attrs.id] = attrs;
  return new User(attrs);
};

User.fetch = function(userId, callback) {
  if (!client) throw new Error("Hull client is not configured.");
  client.get(userId, function(user, res) {
    if (res.status == 200) {
      usersDatabase[userId] = user;
      callback(null,new User(user));
    }
  });
};

User.getOrFetch = function(userId, callback) {
  var user = usersDatabase[userId];
  if (user) {
    callback(null, new User(user));
  } else {
    User.fetch(userId, callback);
  }
};

module.exports = User;
