import { Groups } from '/imports/catalogs/catalogs.js';

if(Groups.find({}).count() == 0){
	Groups._ensureIndex({'index':1}, {unique: true});
	Groups.insert({"index":1, "group": "A", "teams": {"seed_1": "Russia", "seed_2": "Saudi Arabia", "seed_3": "Egypt", "seed_4": "Uruguay"}});
	Groups.insert({"index":2, "group": "B", "teams": {"seed_1": "Portugal", "seed_2": "Spain", "seed_3": "Morocco", "seed_4": "Iran"}});
	Groups.insert({"index":3, "group": "C", "teams": {"seed_1": "France", "seed_2": "Australia", "seed_3": "Peru", "seed_4": "Denmark"}});
	Groups.insert({"index":4, "group": "D", "teams": {"seed_1": "Argentina", "seed_2": "Iceland", "seed_3": "Croatia", "seed_4": "Nigeria"}});
	Groups.insert({"index":5, "group": "E", "teams": {"seed_1": "Brazil", "seed_2": "Switzerland", "seed_3": "Costa Rica", "seed_4": "Serbia"}});
	Groups.insert({"index":6, "group": "F", "teams": {"seed_1": "Germany", "seed_2": "Mexico", "seed_3": "Sweden", "seed_4": "South Korea"}});
	Groups.insert({"index":7, "group": "G", "teams": {"seed_1": "Belgium", "seed_2": "Panama", "seed_3": "Tunisia", "seed_4": "England"}});
	Groups.insert({"index":8, "group": "H", "teams": {"seed_1": "Poland", "seed_2": "Senegal", "seed_3": "Colombia", "seed_4": "Japan"}});
}