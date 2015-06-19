if (Meteor.isClient) {

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
