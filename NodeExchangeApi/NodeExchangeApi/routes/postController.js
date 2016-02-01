"use strict";
var sql = require('mssql');
var User = require('../model/User.js');
var Address = require('../model/Address.js');
var Phone = require('../model/Phone.js');
var Result = require('../model/Result.js');
var config = require('./config.js');


exports.createNewPost = function (req, res)
{
    var username = req.body.username;
    var password = req.body.password;
    var title = req.body.title;
    var postdescription = req.body.postdescription;
    var price = req.body.price;
    var isdelivery = req.body.isdelivery;
    var listcategory = req.body.listcategory;
    var listaddress = req.body.listaddress;
    var listtag = req.body.listtag;
    var listimage = req.body.listimage;
    
    
    var connection = new sql.Connection(config.connectionString);
    
    connection.connect(function (err)
    {
        if (err)
        {
            config.responseWithError(res, err);
        }
        
        var request = new sql.Request(connection);
        
        request.input("username", sql.NVarChar(20), username);
        request.input("password", sql.NVarChar(20), password);
        request.input("title", sql.NVarChar(20), title);
        request.input("postdescription", sql.NVarChar(50), postdescription);
        request.input("price", sql.NVarChar(100), price);
        request.input("isdelivery", sql.NVarChar(300), isdelivery);
        request.input("listcategory", sql.NVarChar(100), listcategory);
        request.input("listaddress", sql.NVarChar(1), listaddress);
        request.input("listtag", sql.NVarChar(100), listtag);
        request.input("listimage", sql.NVarChar(100), listimage);
        
        request.execute("post_PostAdd").then(function (recordsets)
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



exports.deletePost = function (req, res)
{
}

exports.updatePost = function (req, res)
{
}


exports.getPost = function (req, res)
{
}