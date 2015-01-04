
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , messages = require('./routes/messages')
  , http = require('http')
  , path = require('path')
  , morgan = require('morgan')
  , bodyParser = require('body-parser')
  , serveFavicon = require('serve-favicon')
  , errorHandler = require('errorhandler')
  , methodOverride = require('method-override');

var os = require('os');
var sharpUtil = require('../common/sharp-utils.js');
var app = express();

// all environments
app.set('port', process.env.SHARPSERVER_PORT || 54277);
app.set('data_dir', sharpUtil.getDataDirectory() );
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
// app.use(serveFavicon());
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

app.get('/messages', messages.get);
app.post('/messages', messages.post);
app.put('/messages', messages.put);
app['delete']('/messages', messages['delete']);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

console.log("Data Directory: " + app.get('data_dir'));