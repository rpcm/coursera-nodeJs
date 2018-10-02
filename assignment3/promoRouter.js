/** Import modules **/
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Promotions = require('../models/promotions');
var Verify    = require('./verify');

/** Variables **/
var promoRouter = express.Router();

/** Uses **/
promoRouter.use(bodyParser.json());

/** Routing **/
promoRouter.route('/')
.get(Verify.verifyOrdinaryUser, function(req, res, next){
	Promotions.find({}, function (err, promotion) {
        if (err) {
        	throw err;
        }
        res.json(promotion);
    });
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
    Promotions.create(req.body, function (err, promotion) {
        if (err) {
        	throw err;
        }
       
        var id = promotion._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end('Added the promotion with id: ' + id);
    });  
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
	Promotions.remove({}, function (err, resp) {
        if (err) {
        	throw err;
        }
        res.json(resp);
    });
});

promoRouter.route('/:promotionId')
.get(Verify.verifyOrdinaryUser, function(req, res, next){
	Promotions.findById(req.params.promotionId, function (err, promotion) {
        if (err) {
        	throw err;
        }
        res.json(promotion);
    });
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
	Promotions.findByIdAndUpdate(req.params.promotionId, {
        $set: req.body
    }, {
        new: true
    }, function (err, promotion) {
        if (err) {
        	throw err;
        }
        res.json(promotion);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
	Promotions.findByIdAndRemove(req.params.promotionId, function (err, resp) {        
		if (err) {
        	throw err;
        }
        res.json(resp);
    });
});

/** Export **/
module.exports = promoRouter;