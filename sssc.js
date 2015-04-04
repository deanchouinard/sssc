if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });

  Session.setDefault('mcString', "yp");
  Meteor.call("getMyString", function(err, res) {
    Session.set("mcString", res);
  });

  Template.methodCall.helpers({
    mcString: function () {
      return Session.get('mcString');
    }
  })

  var myTempCollection = new Mongo.Collection("myStringCollection");
  Meteor.subscribe("myString");
  
  Template.mystring.helpers({
    myString: function() {
      console.log( "hello");
      return myTempCollection.findOne().myString ;

    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.publish("myString", function() {
    // don't return a cursor from a database, just tell DDP to add your string to the publication and send that
    this.added("myStringCollection", null, {myString: "herpderp"});
  });

  Meteor.methods({ 
    getMyString: function() {
      return "method call: herpderp";
    }
  });
}
