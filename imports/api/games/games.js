import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Mongo } from 'meteor/mongo';
// import { SimpleSchema } from 'meteor/aldeed:simple-schema';
 import SimpleSchema from 'simpl-schema'

class GamesCollection extends Mongo.Collection{

}

export const Games = new GamesCollection('Games');

Games.deny({
    insert() {return false;},
    update() {return false;},
    remove() {return false;},
});

// Games.publicFields = {
//   name: 1,
//   creator: 1,
//   players: 1,
//   createdAt: 1,
// }

// playersSchema = new SimpleSchema({
//   playerId: {
//     type: String
//   },
//   Score: {
//     type: Number
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
//     type: playersSchema
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
