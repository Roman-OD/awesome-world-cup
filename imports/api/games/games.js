import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Mongo } from 'meteor/mongo';
// import { SimpleSchema } from 'meteor/aldeed:simple-schema';
 import SimpleSchema from 'simpl-schema'

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
  players: 1,
  createdAt: 1,
  started:1 ,
}

// teamSeedSchema = new SimpleSchema({
//   seed_1: {
//     type: String
//   },
//   seed_2: {
//     type: String
//   },
//   seed_3: {
//     type: String
//   },
//   seed_4: {
//     type: String
//   }
// });

// playersSchema = new SimpleSchema({
//   playerId: {
//     type: String
//   },
//   playerName: {
//     type: String
//   },
//   Score: {
//     type: Number
//   },
//   rerollCount: {
//     type: Number
//   },
//   lockIn: {
//     type: Boolean
//   },
//   teams: {
//     type: teamSeedSchema
//   }
// });

// Games.schema = new SimpleSchema({
//   name: {
//     type: String
//   },
//   creator:{
//     type: String
//   },
//   players: {
//     type: Array
//   },
//   players.$.playerId:{
//     type: String
//   },
//   started: {
//     type: Boolean
//   },
//   createdAt: {
//     type: Date,
//     optional: true,
//     autoValue: function(){
//       return new Date();
//     }
//   }
// });



// Games.attachSchema(Games.schema);
