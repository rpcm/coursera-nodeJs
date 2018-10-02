// Imports
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Will add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

//Create the promotion schema
var promotionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
	image: {
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
    }
}, {
    timestamps: true
});

//Create the model using the schema
var Promotions = mongoose.model('Promotion', promotionSchema);

// Export the model to the Node applications
module.exports = Promotions;