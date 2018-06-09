import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { ValidatedMethod} from 'meteor/mdg:validated-method';
 import SimpleSchema from 'simpl-schema';

export const addUser = new ValidatedMethod({
  name: 'users.add',
  validate: new SimpleSchema({
    username: {type: String},
    password: {type: String}
  }).validator(),
  run({ username, password }){
    const doc = {
                  user: {
                    username: username,
                    password: password
                  }
                };
    const newUserId = Accounts.createUser(doc.user);
    console.log(newUserId);
    return newUserId;
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
