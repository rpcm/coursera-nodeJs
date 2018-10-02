// Imports
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Create the leadership schema
var leadershipSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
	image: {
		type: String
	},
	designation: {
		type: String
	},
	abbr: {
		type: String		
	},
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

//Create the model using the schema
var Leaderships = mongoose.model('Leadership', leadershipSchema);

// Export the model to the Node applications
module.exports = Leaderships;