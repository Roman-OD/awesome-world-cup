import { Meteor } from 'meteor/meteor';

export const Groups = new Mongo.Collection('Groups');
export const Teams = new Mongo.Collection('Teams');
export const Matches = new Mongo.Collection('Matches');
export const Odds = new Mongo.Collection('Odds');
