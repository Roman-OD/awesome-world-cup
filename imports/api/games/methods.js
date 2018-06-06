import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Games } from './games.js';

export const createNewGame = new ValidatedMethod({
  name: 'Games.create',
  validate: new SimpleSchema({
    name: Games.simpleSchema().schema('name'),
    creator: Games.simpleSchema().schema('creator'),
    users: Games.simpleSchema().schema('users'),
    'users.$': {
      type: Object
    }
  }).validator(),
  run({name, creator, users}){
    let doc = {
      name: name,
      creator: creator,
      users: users
    }
    return Games.insert({doc});
  }
});
