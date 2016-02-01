"use strict";
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/userController');
var address = require('./routes/addressController.js');
var phone = require('./routes/phoneController.js');
var uComment = require('./routes/userCommentController.js');
var uRating = require('./routes/userRatingController.js');
var general = require('./routes/generalController.js');
var post = require('./routes/postController.js')
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env'))
{
    app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function ()
{
    console.log('Express server listening on port ' + app.get('port'));
});

app.get('/', routes.index);
app.post('/user/login', user.login);
app.post('/user/get', user.getUserInfo);
app.post('/user/changepass', user.changePassword);
app.post('/user/create', user.createNewAccount);
app.post('/user/update', user.updateUserInfo);

app.post('/user/address/add', address.addNewAddress);
app.post('/user/address/update', address.updateAddress);
app.post('/user/address/delete', address.deleteAddress);
app.post('/user/address/getAll', address.getAllAddress);

app.post('/user/phone/add', phone.addNewPhone);
app.post('/user/phone/delete', phone.deletePhone);
app.post('/user/phone/getAll', phone.getAllPhone);

app.post('/user/comment/add', uComment.addNewComment);
app.post('/user/comment/update', uComment.updateComment);
app.post('/user/comment/delete', uComment.deleteComment);
app.post('/user/comment/getAll', uComment.getAllComment);

app.post('/user/rating/likeordislike', uRating.likeOrDislike);
app.post('/user/rating/getAll', uRating.getAll);

app.post('/general/getCountryCityDistrict', general.getAllCountryCityDistrict);

app.post('/post/add', post.createNewPost);
app.post('/post/update', post.updatePost);
app.post('/post/delete', post.deletePost);




