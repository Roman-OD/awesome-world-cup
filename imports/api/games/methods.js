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

export const addPlayerToGame = new ValidatedMethod({
  name: 'Games.addPlayerToGame',
  validate: null,
  run({gameId, player}) {
    Games.update({_id: gameId}, {$push: {players: player}});
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

export const updateBettings = new ValidatedMethod({
  name: 'Games.updateBettings',
  validate: null,
  run({gameId, playerName, selectedBets}) {
    const setModifier = {$set: {}};
    const game = Games.find({_id: gameId}).fetch()[0];
    const player = game.players.find(player => { return player.name === playerName });
    const stake = Object.keys(selectedBets).find(bet => { return selectedBets[bet].selected === true; }).stake;
    console.log(stake);
    if (!player.selectedBets) {
      player.selectedBets = [];
      player.selectedBets.push(selectedBets);
      Games.update({_id: gameId, 'players.name': playerName}, {$set: {'players.$': player}});
      Games.update({_id: gameId, 'players.name': playerName}, {$inc: {'players.$.score': - stake}});
    } else {
      const existingBet = player.selectedBets.filter(bet => { return bet.matchId === selectedBets.matchId });
      if (existingBet.length > 0) {
        console.log('player already betted on this match');
      } else {
        player.selectedBets.push(selectedBets);
        Games.update({_id: gameId, 'players.name': playerName}, {$set: {'players.$': player}});
        Games.update({_id: gameId, 'players.name': playerName}, {$inc: {'players.$.score': - stake}});
      }
    }
  }
});
