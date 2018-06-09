import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

export const Users = Meteor.users;

Users.publicFields = {
  username: 1,
  createdAt: 1,
}
