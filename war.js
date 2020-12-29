mongoose = require('mongoose');

var warSchema = mongoose.Schema({

	name: {
		type: String
	},
	year: {
		type: Number
	},
	battle_number: {
		type: Number 
	},
	attacker_king: {
		type: String
	},
	defender_king: {
		type: String
	},
    attacker_1: {
    	type: String
    },
    attacker_2: {
    	type: String
    },
    attacker_3: {
    	type: String
    },
    attacker_4: {
    	type: String
    },
    defender_1: {
    	type: String
    },
    defender_2: {
    	type: String
    },
    defender_3: {
    	type: String
    },
    defender_4: {
    	type: String
    },
    attacker_outcome: {
    	type: String
    },
    battle_type: {
    	type: String
    },
    major_death: {
    	type: String
    },
    major_capture: {
    	type: Number
    },
    attacker_size: {
    	type: Number
    },
    defender_size: {
    	type: Number
    },
    attacker_commander: {
    	type: String
    },
    defender_commander: {
    	type: String
    },
    summer: {
    	type: Number
    },
    location: {
    	type: String
    },
    region: {
    	type: String
    },
    note: {
    	type: String
    }
});

var War = module.exports = mongoose.model('War', warSchema);

module.exports.getListofNames = function(callback)
{
	console.log("Here");
	War.distinct("location",{ location:1, _id:0 }, callback);
}

module.exports.getBattleCount = function(callback)
{
	console.log("Here");
	War.find({}, callback).count();
}

module.exports.getKings = function(name, callback)
{
	//console.log("Here");
	War.find({ $or: [{attacker_king: name}, {defender_king: name}] }, callback);
}

module.exports.getKingsFilter = function(name, location, type, callback)
{
	War.find({ $and: [{ $or: [{attacker_king: name}, {defender_king: name}]},{battle_type: type}, {location: location}]}, callback);
}

module.exports.getWars = function(callback)
{
	War.find({},callback);
}