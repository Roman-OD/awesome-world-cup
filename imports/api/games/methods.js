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
  run({name, creator, players, started}){
    console.log('inserting new game');
    console.log(players);
    let gameID = Games.insert({
        'name': name,
        'creator': creator,
        'players': players,
        'started' : started
      });
    console.log(gameID);
    return gameID;
  }
});
