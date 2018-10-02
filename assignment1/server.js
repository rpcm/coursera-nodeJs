/** Import modules **/
var express = require('express');
var morgan = require('morgan');

var dishRouter = require('./dishRouter');
var promoRouter = require('./promoRouter');
var leaderRouter = require('./leaderRouter');

/** Variables **/
var hostname = 'localhost';
var port = 3000;
var app = express();

/** App mount **/
app.use(morgan('dev'));
app.use('/dishes',dishRouter);
app.use('/promotions',promoRouter);
app.use('/leadership',leaderRouter);

app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});

