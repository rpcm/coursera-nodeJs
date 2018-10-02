// Imports
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Will add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

//Create the comment schema
var commentSchema = new Schema({
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:  {
        type: String,
        required: true
    },
    author:  {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

//Create the dish schema
var dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
	image: {
		type: String
	},
	category: {
		type: String
	},
	label: {
		type: String,		
		default: ""
	},
	price: {
		type: Currency		
	},
    description: {
        type: String,
        required: true
    },
    comments:[commentSchema]
}, {
    timestamps: true
});

//Create the model using the schema
var Dishes = mongoose.model('Dish', dishSchema);

// Export the model to the Node applications
module.exports = Dishes;