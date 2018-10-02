// Imports
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//Create the favorites schema
var favoriteSchema = new Schema({
   postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dishes: [{        
        type: mongoose.Schema.Types.ObjectId,        
        ref: 'Dish'    
    }]
}, {
    timestamps: true
});



//Create the model using the schema
var Favorites = mongoose.model('Favorite', favoriteSchema);

// Export the model to the Node applications
module.exports = Favorites;