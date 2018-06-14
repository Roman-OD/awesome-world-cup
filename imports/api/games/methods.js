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

export const startGame = new ValidatedMethod({
  name: 'Games.start',
  validate: null,
  run({gameID}){
    Games.update({_id: gameID}, {$set: {'lockedIn': true}});
  }
});

export const assignTeam = new ValidatedMethod({
  name: 'Games.assignTeam',
  validate: null,
  run({gameId, playerName, team, seed}) {
    const setModifier = {$set: {}};
    setModifier.$set[`players.$.${seed}`] = team;
    return Games.update(
      {_id: gameId, 'players.name': playerName},
      setModifier,
      false, true);
  }
});

export const updatePlayerStatus = new ValidatedMethod({
  name: 'Games.updatePlayerStatus',
  validate: null,
  run({gameId, playerName}) {
    const setModifier = {$set: {}};
    setModifier.$set['players.$.status'] = 'locked-in';
    return Games.update(
      {_id: gameId, 'players.name': playerName},
      setModifier,
      false, true);
  }
});
