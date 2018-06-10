import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './Fixtures.html'

Template.Fixtures.onCreated(function(){
	this.fixtures = new ReactiveVar({});
	let data = {};
	fetch('https://raw.githubusercontent.com/openfootball/world-cup.json/master/2018/worldcup.json')
	    .then(res => res.json())
	    .then(body =>data = body)
	    .then(data => this.fixtures.set(data.rounds))
	    .then(()=> console.log(this.fixtures.get()));

	// console.log(data);
	    // .then(rounds => console.log(rounds));
});

Template.Fixtures.helpers({
	rounds: () => {
		let matchDays = [];
		for(var i=0; i<Template.instance().fixtures.get().length; i++)
			matchDays.push(Template.instance().fixtures.get()[i]);		
		return matchDays;
	}
});