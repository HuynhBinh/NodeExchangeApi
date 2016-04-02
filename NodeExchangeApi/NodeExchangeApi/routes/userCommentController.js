"use strict";
var sql = require('mssql');
var User = require('../model/User.js');
var Address = require('../model/Address.js');
var Phone = require('../model/Phone.js');
var Result = require('../model/Result.js');
var config = require('./config.js');
var UserRating = require('../model/UserRating.js');
var UserComment = require('../model/UserComment.js');


exports.addNewComment = function (req, res)
{
    var username = req.body.username;
    var commentcontent = req.body.commentcontent;
    var commentuser = req.body.commentuser;
    
    var connection = new sql.Connection(config.connectionString);
    
    connection.connect(function (err)
    {
        if (err)
        {
            config.responseWithError(res, err);
        }
        
        var request = new sql.Request(connection);
        
        request.input("username", sql.NVarChar(20), username);
        request.input("commentcontent", sql.NVarChar(200), commentcontent);
        request.input("commentuser", sql.NVarChar(20), commentuser);
        
        request.execute("user_CommentAdd").then(function (recordsets)
        {
            if (recordsets.length > 1)
            {
                var tblResult = recordsets[1];
                var comments = new Array();
                
                for (var row of tblResult) 
                {
                    var id = row.CommentID;
                    var username = row.Username;
                    var content = row.CommentContent;
                    var commentuser = row.CommentUser;
                    var date = row.CommentDate;

                    var comment = new UserComment(id, content, username, commentuser, date);
                    comments.push(comment);
                }
                
                config.responseWithData(res, phones);
                
            }
            else
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
                
                
            }
        });
    });
}


exports.updateComment = function (req, res)
{
    //[user_CommentUpdate]
    var commentid = req.body.commentid;
    var commentcontent = req.body.commentcontent;
    var commenteduser = req.body.commenteduser;
    
    var connection = new sql.Connection(config.connectionString);
    
    connection.connect(function (err)
    {
        if (err)
        {
            config.responseWithError(res, err);
        }
        
        
        var point;
        
        toGeometry(latitude, longitude, function (p)
        {
            point = p;
        });
        
        var request = new sql.Request(connection);
        
        request.input("commentid", sql.NVarChar(20), commentid);
        request.input("commentcontent", sql.NVarChar(20), commentcontent);
        request.input("commenteduser", sql.NVarChar(1), commenteduser);

        
        request.execute("user_CommentUpdate").then(function (recordsets)
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


exports.deleteComment = function (req, res)
{
    var commentusername = req.body.commentusername;
    var commentuserpassword = req.body.commentuserpassword;
    var commentid = req.body.commentid;
    
    var connection = new sql.Connection(config.connectionString);
    
    connection.connect(function (err)
    {
        if (err)
        {
            config.responseWithError(res, err);
        }
        
        var request = new sql.Request(connection);
        
        request.input("commentid", sql.NVarChar(20), commentusername);
        request.input("commenteduser", sql.NVarChar(20), commentuserpassword);
        request.input("commentuserpassword", sql.NVarChar(15), addressid);
        
        
        request.execute("user_CommentDelete").then(function (recordsets)
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



exports.getAllComment = function (req, res)
{
    //[user_CommentGetAll]
    var username = req.body.username;
    var from = req.body.from;
    var to = req.body.to;
    
    var connection = new sql.Connection(config.connectionString);
    
    connection.connect(function (err)
    {
        if (err)
        {
            config.responseWithError(res, err);
        }
        
        var request = new sql.Request(connection);
        
        request.input("username", sql.NVarChar(20), username);
        request.input("from", sql.Int, from);
        request.input("to", sql.Int, to);
        
        request.execute("user_CommentGetAll").then(function (recordsets)
        {
            if (recordsets.length > 0)
            {
                
                var tblComment = recordsets[0];
                
                var comments = new Array();
                
                for (var row of tblComment) 
                {
                    var id = row.CommentID;
                    var username = row.Username;
                    var content = row.CommentContent;
                    var commentuser = row.CommentUser;
                    var commentdate = row.CommentDate;

                    var comment = new UserComment(id, content, username, commentuser, commentdate);
                    comments.push(comment);
                }
                
                config.responseWithData(res, comments);
            }
            else
            {
                config.responseWithError(res, config.unknownError);
            }
        });
    });


}


