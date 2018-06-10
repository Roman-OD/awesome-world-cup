import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Games } from '/imports/api/games/games.js';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { assignTeams } from '/imports/api/games/methods.js';

import './Games.html';
import './NewGameModal.js';

Template.Games.onCreated(function(){
  this.autorun(() => {
    this.subscribe('users.all');
    this.subscribe('games.all');
  })

  // assignTeams.call(function(err, resp){
  //   if(err)
  //     console.log(err);
  // });

fetch('https://raw.githubusercontent.com/openfootball/world-cup.json/master/2018/worldcup.json')
    .then(res => res.text())
    .then(body => console.log(body));
    
});

Template.Games.helpers({
  creatorGames: ()=>{
    return Games.find({'creator': Meteor.userId()}).fetch();
  },
  noCreatorGames: ()=>{
    console.log(Meteor.userId());
    console.log(Games.find({'creator': Meteor.userId()}).fetch());
    console.log(Games.find({'creator': Meteor.userId()}).count());
    if (Games.find({'creator': Meteor.userId()}).count() > 0)
      return false;
    else
      return true;

  },
  memberGames: ()=>{
    return Games.find({'players.id': Meteor.userId()}).fetch();
  },
  noMemberGames: ()=>{
    if (Games.find({'players.id': Meteor.userId()}).count() > 0)
      return false;
    else
      return true;
  },
  players: (game)=>{
    let playersLookup = [];
    for(var i=0;i<game.players.length;i++){
      playersLookup.push(Users.find({_id: game.players[i]}).fetch()[0].username);
    }
    console.log(playersLookup);
    return playersLookup;

  }
});

Template.Games.events({
  'click #create-new-game': (event) => {
    FlowRouter.go('/new-game');
  }
})
