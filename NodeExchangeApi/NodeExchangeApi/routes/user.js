"use strict";
var sql = require('mssql');
var User = require('../model/User.js');
var Address = require('../model/Address.js');
var Phone = require('../model/Phone.js');
var config = require('./config.js');
/*
 * GET users listing.
 */

exports.list = function (req, res)
{
    res.send("respond with a resource");
};


exports.login = function (req, res)
{
    var username = req.body.username;
    var password = req.body.password;
    
    var connection = new sql.Connection(config.connectionString);
    
    connection.connect(function (err)
    {
        if (err)
        {
            res.send(err);
        }
        
        var request = new sql.Request(connection);
        
        request.input("username", sql.NVarChar(20), username);
        request.input("password", sql.NVarChar(20), password);
        
        request.execute("user_Login").then(function (recordsets)
        {
            
            if (recordsets.length > 1)
            {
                var tblUser = recordsets[0];
                var tblAddress = recordsets[1];
                var tblPhone = recordsets[2];
                var tblRating = recordsets[3];
                
                extractData(tblUser, tblAddress, tblPhone, tblRating, function (user)
                {
                    res.json(user);
                });
                
                
                res.json(user);
            }
            else
            {
                res.json('error');
            }
        });
    });
};


exports.getUserInfo = function (req, res)
{
    var username = req.body.username;
    
    var connection = new sql.Connection(config.connectionString);
    
    connection.connect(function (err)
    {
        if (err)
        {
            res.send(err);
        }
        
        var request = new sql.Request(connection);
        
        request.input("username", sql.NVarChar(20), username);
        
        request.execute("user_GetUserInfo").then(function (recordsets)
        {
            
            if (recordsets.length > 1)
            {
                var tblUser = recordsets[0];
                var tblAddress = recordsets[1];
                var tblPhone = recordsets[2];
                var tblRating = recordsets[3];
                
                extractData(tblUser, tblAddress, tblPhone, tblRating, function (user)
                {
                    res.json(user);
                });
            }
            else
            {
                res.json('error');
            }
        });
    });
};

exports.changePassword = function (req, res)
{
    var username = req.body.username;
    var oldPassword = req.body.oldPassword;
    var newPassword = req.body.newPassword;
    
    var connection = new sql.Connection(config.connectionString);
    
    connection.connect(function (err)
    {
        if (err)
        {
            res.send(err);
        }
        
        var request = new sql.Request(connection);
        
        request.input("username", sql.NVarChar(20), username);
        request.input("oldpassword", sql.NVarChar(20), oldPassword);
        request.input("newpassword", sql.NVarChar(20), newPassword);
        
        request.execute("user_ChangePass").then(function (recordsets)
        {
            if (recordsets.length > 0)
            {
                var tblResult = recordsets[0];

                var row0 = tblResult[0];
               
                res.json(row0);
            }
            else
            {
                res.json('error');
            }
        });
    });
}





function extractData(tblUser, tblAddress, tblPhone, tblRating, callback)
{
    var user;
    
    for (var row of tblUser)
    {                  
                    var uname = row.Username;
                    var pass = row.Password;
                    var dname = row.DisplayName;
                    var email = row.Email;
                    var desc = row.Description;
                    var avatar = row.AvatarLink;
                    var isPublic = row.IsPublic;
                    var fb = row.FaceBookLink;
                    var tt = row.TwitterLink;
                    var insta = row.InstagramLink;
                    
                    user = new User(uname, pass, dname, email, desc, avatar, isPublic, fb, tt, insta);
    }
    
    var addresses = new Array();
    
    for (var row of tblAddress)
    {                  
                    var id = row.AddressID;
                    var lat = row.Latitude;
                    var lng = row.Longitude;
                    var city = row.CityID;
                    var country = row.CountryID;
                    var district = row.DistrictID;
                    var ward = row.Ward;
                    var street = row.Street;
                    var note = row.Note;

                    var address = new Address(id, lat, lng, country, city, district, ward, street, note);
                                     
                    addresses.push(address);
     }
    
    user.setAddresses(addresses);
    
    
    var phones = new Array();
    
    for (var row of tblPhone) 
    {
                    var phone = row.PhoneNumber;
                    var type = row.PhoneType;
                    var isDisplay = row.IsDisplay;

                    var phone = new Phone(phone, type, isDisplay);
                    phones.push(phone);
    }
    
    user.setPhones(phones);
    
    var ratings = new Array();
    
    for (var row of tblRating) 
    {
                    var type = row.Type;
                    var point = row.Point;

                    if (type == "Dislike") {
                        user.setToalDislike(point);
                    }
                    else
                    {
                        user.setTotalLike(point);
                    }

     }
    
    callback(user);
}