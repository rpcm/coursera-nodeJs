/** Import modules **/
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Favorites = require('../models/favorites');
var Verify = require('./verify');

/** Variables **/
var favoriteRouter = express.Router();

/** Uses **/
favoriteRouter.use(bodyParser.json());

/** Routing **/
favoriteRouter.route('/')
.get(Verify.verifyOrdinaryUser, function(req, res, next){
    Favorites.find({postedBy: req.decoded._doc._id })        
        .populate('postedBy')
        .populate('dishes')
        .exec(function (err, favorites) {
            if (err) {
                throw err;
            }
            res.json(favorites);
         });
})

.post(Verify.verifyOrdinaryUser, function(req, res, next){
    Favorites.findOneAndUpdate({postedBy : req.decoded._doc._id}, 
                {$addToSet: { dishes: req.body}},
                {upsert:true, new:true} , 
                function (err, favorite) {
                    if (err) {
                        throw err;
                    }
                    res.json(favorite);
                }
    );
})

.delete(Verify.verifyOrdinaryUser, function(req, res, next){
	Favorites.remove({postedBy: req.decoded._doc._id}, function (err, resp) {
        if (err) {
        	throw err;
        }
        res.json(resp);
    });
});

favoriteRouter.route('/:dishObjectId')
.delete(Verify.verifyOrdinaryUser, function(req, res, next){
    Favorites.findOneAndUpdate({postedBy : req.decoded._doc._id}, 
                {$pull: {dishes: req.params.dishObjectId} }, 
                {new: true }, 
                function(err, dish) {
                    if (err) {
                        throw err;
                    }
                    res.json(dish);
                }
    );
});

/** Export **/
module.exports = favoriteRouter;