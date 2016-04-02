"use strict";
var sql = require('mssql');
var User = require('../model/User.js');
var Address = require('../model/Address.js');
var Phone = require('../model/Phone.js');
var Result = require('../model/Result.js');
var config = require('./config.js');


exports.addNewPhone = function (req, res)
{
    var username = req.body.username;
    var phonenumber = req.body.phonenumber;
    var phonetype = req.body.phonetype;
    
    var connection = new sql.Connection(config.connectionString);
    
    connection.connect(function (err)
    {
        if (err)
        {
            config.responseWithError(res, err);
        }
             
        var request = new sql.Request(connection);
        
        request.input("username", sql.NVarChar(20), username);
        request.input("phonenumber", sql.NVarChar(15), phonenumber);
        request.input("phonetype", sql.NVarChar(20), phonetype);
        
        request.execute("user_PhoneAddNew").then(function (recordsets)
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


exports.deletePhone = function (req, res)
{
    var username = req.body.username;
    var password = req.body.password;
    var phonenumber = req.body.phonenumber;
    var phonetype = req.body.phonetype;
    
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
        request.input("phonenumber", sql.NVarChar(15), addressid);
        request.input("phonetype", sql.NVarChar(20), addressid);
        
        
        request.execute("user_PhoneDelete").then(function (recordsets)
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


exports.getAllPhone = function (req, res)
{
    var username = req.body.username;
    
    var connection = new sql.Connection(config.connectionString);
    
    connection.connect(function (err)
    {
        if (err)
        {
            config.responseWithError(res, err);
        }
              
        var request = new sql.Request(connection);
        
        request.input("username", sql.NVarChar(20), username);
        
        request.execute("user_PhoneGetAll").then(function (recordsets)
        {
            if (recordsets.length > 0)
            {
                var tblPhone = recordsets[0];
                
                var phones = new Array();
                
                for (var row of tblPhone) 
                {
                    var phone = row.PhoneNumber;
                    var type = row.PhoneType;
                    var isDisplay = row.IsDisplay;

                    var phone = new Phone(phone, type, isDisplay);
                    phones.push(phone);
                }
                
                config.responseWithData(res, phones);
            }
            else
            {
                config.responseWithError(res, config.unknownError);
            }
        });
    });
}