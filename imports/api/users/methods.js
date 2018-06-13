import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { ValidatedMethod} from 'meteor/mdg:validated-method';
import { Users } from './users.js';
 import SimpleSchema from 'simpl-schema';

export const addUser = new ValidatedMethod({
  name: 'users.add',
  validate: new SimpleSchema({
    username: {type: String},
    email: {type: String},
    password: {type: String},
  }).validator(),
  run({ username, email, password }){

    const newUserId = Accounts.createUser({ username, email, password });
    Users.update(newUserId, { $set: {'profile.invitations': [] }});
    console.log(newUserId);
    return newUserId;
  }
});

export const checkUser = new ValidatedMethod({
  name: 'user.check',
  validate: new SimpleSchema({
    username: {type: String}
  }).validator(),
  run({username}){
    return (Users.find({'username': username}).count() > 0);
  }
});

export const updateInvitations = new ValidatedMethod({
 name: 'user.update.invitations',
  validate: new SimpleSchema({
    username: {type: String}
  }).validator(),
  run({username}){
    // invitaiton logic goes here...
  }
});


// export const loginUser = new ValidatedMethod({
//   name: 'users.login',
//   validate: new SimpleSchema({
//     username: {type: String},
//     password: {type: String}
//   }).validator(),
//   run({ username, password }){
//     if(Meteor.isClient){
//       Meteor.loginWithPassword(username, password, (err, resp) => {
//         if(err)
//           console.log(err);
//         else
//           console.log("logged in user");

//       });
//     }
//   }
// });
