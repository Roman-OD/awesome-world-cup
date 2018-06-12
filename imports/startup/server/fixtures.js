import { Groups } from '/imports/catalogs/catalogs.js';
import { Teams } from '/imports/catalogs/catalogs.js';

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

if(Teams.find({}).count() == 0) {
	const teams = [
		{
		 "id": 1,
		 "name": "Russia",
		 "fifaCode": "RUS",
		 "iso2": "ru",
		 "flag": "https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Flag_of_Russia.svg/900px-Flag_of_Russia.png",
		 "emoji": "flag-ru",
		 "emojiString": "🇷🇺",
		 "seed": 1,
		 "group": "a"
	 },
	 {
		 "id": 2,
		 "name": "Saudi Arabia",
		 "fifaCode": "KSA",
		 "iso2": "sa",
		 "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Flag_of_Saudi_Arabia.svg/750px-Flag_of_Saudi_Arabia.png",
		 "emoji": "flag-sa",
		 "emojiString": "🇸🇦",
		 "seed": 2,
		 "group": "a"
	 },
	 {
		 "id": 3,
		 "name": "Egypt",
		 "fifaCode": "EGY",
		 "iso2": "eg",
		 "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Egypt.svg/900px-Flag_of_Egypt.png",
		 "emoji": "flag-eg",
		 "emojiString": "🇪🇬",
		 "seed": 3,
		 "group": "a"
	 },
	 {
		 "id": 4,
		 "name": "Uruguay",
		 "fifaCode": "URU",
		 "iso2": "uy",
		 "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Uruguay.svg/900px-Flag_of_Uruguay.png",
		 "emoji": "flag-uy",
		 "emojiString": "🇺🇾",
		 "seed": 4,
		 "group": "a"
	 },
	 {
		 "id": 5,
		 "name": "Portugal",
		 "fifaCode": "POR",
		 "iso2": "pt",
		 "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Portugal.svg/600px-Flag_of_Portugal.png",
		 "emoji": "flag-pt",
		 "emojiString": "🇵🇹",
		 "seed": 1,
		 "group": "b"
	 },
	 {
		 "id": 6,
		 "name": "Spain",
		 "fifaCode": "ESP",
		 "iso2": "es",
		 "flag": "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Flag_of_Spain.svg/750px-Flag_of_Spain.png",
		 "emoji": "flag-es",
		 "emojiString": "🇪🇸",
		 "seed": 2,
		 "group": "b"
	 },
	 {
		 "id": 7,
		 "name": "Morocco",
		 "fifaCode": "MAR",
		 "iso2": "ma",
		 "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Flag_of_Morocco.svg/900px-Flag_of_Morocco.png",
		 "emoji": "flag-ma",
		 "emojiString": "🇲🇦",
		 "seed": 3,
		 "group": "b"
	 },
	 {
		 "id": 8,
		 "name": "Iran",
		 "fifaCode": "IRN",
		 "iso2": "ir",
		 "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Flag_of_Iran.svg/630px-Flag_of_Iran.png",
		 "emoji": "flag-ir",
		 "emojiString": "🇮🇷",
		 "seed": 4,
		 "group": "b"
	 },
	 {
		 "id": 9,
		 "name": "France",
		 "fifaCode": "FRA",
		 "iso2": "fr",
		 "flag": "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/900px-Flag_of_France.png",
		 "emoji": "flag-fr",
		 "emojiString": "🇫🇷",
		 "seed": 1,
		 "group": "c"
	 },
	 {
		 "id": 10,
		 "name": "Australia",
		 "fifaCode": "AUS",
		 "iso2": "au",
		 "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Australia_%28converted%29.svg/1280px-Flag_of_Australia_%28converted%29.png",
		 "emoji": "flag-au",
		 "emojiString": "🇦🇺",
		 "seed": 2,
		 "group": "c"
	 },
	 {
		 "id": 11,
		 "name": "Peru",
		 "fifaCode": "PER",
		 "iso2": "pe",
		 "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Flag_of_Peru_%28state%29.svg/900px-Flag_of_Peru_%28state%29.png",
		 "emoji": "flag-pe",
		 "emojiString": "🇵🇪",
		 "seed": 3,
		 "group": "c"
	 },
	 {
		 "id": 12,
		 "name": "Denmark",
		 "fifaCode": "DEN",
		 "iso2": "dk",
		 "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Flag_of_Denmark.svg/740px-Flag_of_Denmark.png",
		 "emoji": "flag-dk",
		 "emojiString": "🇩🇰",
		 "seed": 4,
		 "group": "c"
	 },
	 {
		 "id": 13,
		 "name": "Argentina",
		 "fifaCode": "ARG",
		 "iso2": "ar",
		 "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/800px-Flag_of_Argentina.png",
		 "emoji": "flag-ar",
		 "emojiString": "🇦🇷",
		 "seed": 1,
		 "group": "d"
	 },
	 {
		 "id": 14,
		 "name": "Iceland",
		 "fifaCode": "ISL",
		 "iso2": "is",
		 "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Iceland.svg/800px-Flag_of_Iceland.png",
		 "emoji": "flag-is",
		 "emojiString": "🇮🇸",
		 "seed": 2,
		 "group": "d"
	 },
	 {
		 "id": 15,
		 "name": "Croatia",
		 "fifaCode": "CRO",
		 "iso2": "hr",
		 "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Flag_of_Croatia.svg/800px-Flag_of_Croatia.png",
		 "emoji": "flag-hr",
		 "emojiString": "🇭🇷",
		 "seed": 3,
		 "group": "d"
	 },
	 {
		 "id": 16,
		 "name": "Nigeria",
		 "fifaCode": "NGA",
		 "iso2": "ng",
		 "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Flag_of_Nigeria.svg/800px-Flag_of_Nigeria.png",
		 "emoji": "flag-ng",
		 "emojiString": "🇳🇬",
		 "seed": 4,
		 "group": "d"
	 },
	 {
		 "id": 17,
		 "name": "Brazil",
		 "fifaCode": "BRA",
		 "iso2": "br",
		 "flag": "https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/720px-Flag_of_Brazil.png",
		 "emoji": "flag-br",
		 "emojiString": "🇧🇷",
		 "seed": 1,
		 "group": "e"
	 },
	 {
		 "id": 18,
		 "name": "Switzerland",
		 "fifaCode": "SUI",
		 "iso2": "ch",
		 "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Flag_of_Switzerland_%28Pantone%29.svg/320px-Flag_of_Switzerland_%28Pantone%29.png",
		 "emoji": "flag-ch",
		 "emojiString": "🇨🇭",
		 "seed": 2,
		 "group": "e"
	 },
	 {
		 "id": 19,
		 "name": "Costa Rica",
		 "fifaCode": "CRC",
		 "iso2": "cr",
		 "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Costa_Rica_%28state%29.svg/833px-Flag_of_Costa_Rica_%28state%29.png",
		 "emoji": "flag-cr",
		 "emojiString": "🇨🇷",
		 "seed": 3,
		 "group": "e"
	 },
	 {
		 "id": 20,
		 "name": "Serbia",
		 "fifaCode": "SRB",
		 "iso2": "rs",
		 "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Flag_of_Serbia.svg/1350px-Flag_of_Serbia.png",
		 "emoji": "flag-rs",
		 "emojiString": "🇷🇸",
		 "seed": 4,
		 "group": "e"
	 },
	 {
		 "id": 21,
		 "name": "Germany",
		 "fifaCode": "GER",
		 "iso2": "de",
		 "flag": "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/800px-Flag_of_Germany.png",
		 "emoji": "flag-de",
		 "emojiString": "🇩🇪",
		 "seed": 1,
		 "group": "f"
	 },
	 {
		 "id": 22,
		 "name": "Mexico",
		 "fifaCode": "MEX",
		 "iso2": "mx",
		 "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/800px-Flag_of_Mexico.png",
		 "emoji": "flag-mx",
		 "emojiString": "🇲🇽",
		 "seed": 2,
		 "group": "f"
	 },
	 {
		 "id": 23,
		 "name": "Sweden",
		 "fifaCode": "SWE",
		 "iso2": "se",
		 "flag": "https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Flag_of_Sweden.svg/1600px-Flag_of_Sweden.png",
		 "emoji": "flag-se",
		 "emojiString": "🇸🇪",
		 "seed": 3,
		 "group": "f"
	 },
	 {
		 "id": 24,
		 "name": "South Korea",
		 "fifaCode": "KOR",
		 "iso2": "kr",
		 "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/900px-Flag_of_South_Korea.png",
		 "emoji": "flag-kr",
		 "emojiString": "🇰🇷",
		 "seed": 4,
		 "group": "f"
	 },
	 {
		 "id": 25,
		 "name": "Belgium",
		 "fifaCode": "BEL",
		 "iso2": "be",
		 "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Flag_of_Belgium.svg/450px-Flag_of_Belgium.png",
		 "emoji": "flag-be",
		 "emojiString": "🇧🇪",
		 "seed": 1,
		 "group": "g"
	 },
	 {
		 "id": 26,
		 "name": "Panama",
		 "fifaCode": "PAN",
		 "iso2": "pa",
		 "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Flag_of_Panama.svg/450px-Flag_of_Panama.png",
		 "emoji": "flag-pa",
		 "emojiString": "🇵🇦",
		 "seed": 2,
		 "group": "g"
	 },
	 {
		 "id": 27,
		 "name": "Tunisia",
		 "fifaCode": "TUN",
		 "iso2": "tn",
		 "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Tunisia.svg/1200px-Flag_of_Tunisia.png",
		 "emoji": "flag-tn",
		 "emojiString": "🇹🇳",
		 "seed": 3,
		 "group": "g"
	 },
	 {
		 "id": 28,
		 "name": "England",
		 "fifaCode": "ENG",
		 "iso2": "gb-eng",
		 "flag": "https://upload.wikimedia.org/wikipedia/en/thumb/b/be/Flag_of_England.svg/800px-Flag_of_England.png",
		 "emoji": "flag-england",
		 "emojiString": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
		 "seed": 4,
		 "group": "g"
	 },
	 {
		 "id": 29,
		 "name": "Poland",
		 "fifaCode": "POL",
		 "iso2": "pl",
		 "flag": "https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Flag_of_Poland.svg/1280px-Flag_of_Poland.png",
		 "emoji": "flag-pl",
		 "emojiString": "🇵🇱",
		 "seed": 1,
		 "group": "h"
	 },
	 {
		 "id": 30,
		 "name": "Senegal",
		 "fifaCode": "SEN",
		 "iso2": "sn",
		 "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Flag_of_Senegal.svg/900px-Flag_of_Senegal.svg.png",
		 "emoji": "flag-sn",
		 "emojiString": "🇸🇳",
		 "seed": 2,
		 "group": "h"
	 },
	 {
		 "id": 31,
		 "name": "Colombia",
		 "fifaCode": "COL",
		 "iso2": "co",
		 "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Colombia.svg/450px-Flag_of_Colombia.png",
		 "emoji": "flag-co",
		 "emojiString": "🇨🇴",
		 "seed": 3,
		 "group": "h"
	 },
	 {
		 "id": 32,
		 "name": "Japan",
		 "fifaCode": "JPN",
		 "iso2": "jp",
		 "flag": "https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/900px-Flag_of_Japan.png",
		 "emoji": "flag-jp",
		 "emojiString": "🇯🇵",
		 "seed": 4,
		 "group": "h"
	 }
 ];
 teams.forEach((team) => {
	 	Teams.insert(team);
 });
}
