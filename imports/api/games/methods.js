import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Games } from './games.js';
import { Groups } from '/imports/catalogs/catalogs.js';
import { Random } from 'meteor/random';


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


export const assignTeams = new ValidatedMethod({
  name: 'Games.assignteams',
  validate: null,
  run({}){
    // let Game = Games.find({_id: gameId}).fetch()[0];
    let groupPool = Groups.find({}).fetch();
    let playerPool = [];
    playerPool.push(groupPool.splice(Random.choice([0,1,2,3,4,5,6,7]),1));
    playerPool.push(groupPool.splice(Random.choice([0,1,2,3,4,5,6]),1));
    playerPool.push(groupPool.splice(Random.choice([0,1,2,3,4,5]),1));
    playerPool.push(groupPool.splice(Random.choice([0,1,2,3,4]),1));
    console.log('\n');
    console.log(playerPool);
    console.log('\n');

    
  }
});