import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class GamesCollection extends Mongo.Collection{

}

export const Games = new GamesCollection('Games');

Games.deny({
    insert() {return true;},
    update() {return true;},
    remove() {return true;},
});

Games.publicFields = {
  name: 1,
  creator: 1,
  users: 1,
  createdAt: 1,
}

Games.schema = new SimpleSchema({
  name: {
    type: String
  },
  creator:{
    type: String
  },
  users: {
    type: [Object]
  },
  createdAt: {
    type: Date,
    optional: true,
    autoValue: function(){
      return new Date();
    }
  }
});

Games.attachSchema(Games.schema);
