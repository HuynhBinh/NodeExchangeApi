"use strict";
var sql = require('mssql');
var User = require('../model/User.js');
var Address = require('../model/Address.js');
var Phone = require('../model/Phone.js');
var Result = require('../model/Result.js');
var config = require('./config.js');
var UserRating = require('../model/UserRating.js');


exports.likeOrDislike = function (req, res)
{
    var username = req.body.username;
    var ratinguser = req.body.ratinguser;
    var point = req.body.point;
    
    var connection = new sql.Connection(config.connectionString);
    
    connection.connect(function (err)
    {
        if (err)
        {
            config.responseWithError(res, err);
        }
        
        var request = new sql.Request(connection);
        
        request.input("username", sql.NVarChar(20), username);
        request.input("ratinguser", sql.NVarChar(20), ratinguser);
        request.input("point", sql.Int, point);
        
        request.execute("user_RatingLikeOrDislike").then(function (recordsets)
        {
            if (recordsets.length > 0)
            {
                var tblResult = recordsets[0];
                
                var row0 = tblResult[0];
                
                res.json(row0);
            }
            else
            {
                config.responseWithError(res, config.unknownError);
            }
        });
    });
}

exports.getAll = function (req, res)
{
    var username = req.body.username;
    var ratingtype = req.body.ratingtype;
    
    var connection = new sql.Connection(config.connectionString);
    
    connection.connect(function (err)
    {
        if (err)
        {
            config.responseWithError(res, err);
        }
        
        var request = new sql.Request(connection);
        
        request.input("username", sql.NVarChar(20), username);
        request.input("type", sql.NVarChar(20), ratingtype);
        
        request.execute("user_RatingGetAll").then(function (recordsets)
        {
            if (recordsets.length > 0)
            {
                var tblRating = recordsets[0];
                
                var ratings = new Array();
                
                for (var row of tblRating) 
                {
                    var ratingid = row.RatingID;
                    var username = row.Username;
                    var point = row.RatingPoint;
                    var ratinguser = row.RatingUser;
                    var ratingdate = row.RatingDate;

                    var rating = new UserRating(ratingid, point, username, ratinguser, ratingdate);
                    ratings.push(rating);
                }
                
                config.responseWithData(res, ratings);
            }
            else
            {
                config.responseWithError(res, config.unknownError);
            }
        });
    });

}