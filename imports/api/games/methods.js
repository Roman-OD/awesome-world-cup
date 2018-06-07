import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Games } from './games.js';

// export const createNewGame = new ValidatedMethod({
//   name: 'Games.create',
//   validate: new SimpleSchema({
//     name: Games.simpleSchema().schema('name'),
//     creator: Games.simpleSchema().schema('creator'),
//     players: Games.simpleSchema().schema('players'),
//     'players.$': {
//       type: Object
//     }
//   }).validator(),
//   run({name, creator, players}){
//     let doc = {
//       name: name,
//       creator: creator,
//       users: players
//     }
//     return Games.insert({doc});
//   }
// });

export const createNewGame = new ValidatedMethod({
  name: 'Games.create',
  validate:null,
  run({name, creator, players}){
    console.log('inserting new game');
    const doc = {
      game: {
        'name': name,
        'creator': creator,
        'players': players
      }
    };
    console.log(doc.game);
    let gameID = Games.insert(doc.game);
    console.log(gameID);
    return gameID;
  }
});
