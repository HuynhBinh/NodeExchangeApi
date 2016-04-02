"use strict";
var sql = require('mssql');
var User = require('../model/User.js');
var Address = require('../model/Address.js');
var Phone = require('../model/Phone.js');
var Result = require('../model/Result.js');
var config = require('./config.js');

/*
 * GET users listing.
 */
exports.login = function (req, res)
{
    var username = req.body.username;
    var password = req.body.password;
    
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
        
        request.execute("user_UserLogin").then(function (recordsets)
        {
            
            if (recordsets.length > 1)
            {
                var tblUser = recordsets[0];
                var tblAddress = recordsets[1];
                var tblPhone = recordsets[2];
                var tblRating = recordsets[3];
                
                extractData(tblUser, tblAddress, tblPhone, tblRating, function (err, user)
                {
                    if (err)
                    {
                        config.responseWithError(res, err);
                    }
                    
                    config.responseWithData(res, user);
                });
                                             
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
};

exports.getUserInfo = function (req, res)
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
        
        request.execute("user_UserGet").then(function (recordsets)
        {
            
            if (recordsets.length > 1)
            {
                var tblUser = recordsets[0];
                var tblAddress = recordsets[1];
                var tblPhone = recordsets[2];
                var tblRating = recordsets[3];
                
                extractData(tblUser, tblAddress, tblPhone, tblRating, function (err, user)
                {
                    if (err)
                    {
                        config.responseWithError(res, err);
                    }
                    
                    config.responseWithData(res, user);
                   
                });
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
            config.responseWithError(res, err);
        }
        
        var request = new sql.Request(connection);
        
        request.input("username", sql.NVarChar(20), username);
        request.input("oldpassword", sql.NVarChar(20), oldPassword);
        request.input("newpassword", sql.NVarChar(20), newPassword);
        
        request.execute("user_UserChangePass").then(function (recordsets)
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

exports.createNewAccount = function (req, res)
{
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    
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
        request.input("email", sql.NVarChar(100), email);
        
        request.execute("user_UserAdd").then(function (recordsets)
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

exports.updateUserInfo = function (req, res)
{
    var username = req.body.username;
    var password = req.body.password;
    var displayname = req.body.displayname;
    var email = req.body.email;
    var desc = req.body.description;
    var avatar = req.body.avatar;
    var ispublic = req.body.ispublic;
    var facebook = req.body.facebook;
    var twitter = req.body.twitter;
    var instagram = req.body.instagram;
 
    
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
        request.input("displayname", sql.NVarChar(50), displayname);
        request.input("email", sql.NVarChar(100), email);
        request.input("description", sql.NVarChar(300), desc);
        request.input("avartalink", sql.NVarChar(100), avatar);
        request.input("ispublicinfo", sql.NVarChar(1), ispublic);
        request.input("facebooklink", sql.NVarChar(100), facebook);
        request.input("twitterlink", sql.NVarChar(100), twitter);
        request.input("instagramlink", sql.NVarChar(100), instagram);
        
        request.execute("user_UserUpdate").then(function (recordsets)
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


function extractData(tblUser, tblAddress, tblPhone, tblRating, callback)
{
    var user;
    
    try
    {
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
        
        for (var row of tblRating) 
        {
                    var type = row.Type;
                    var point = row.Point;

                    if (type == "Dislike") 
                    {
                        user.setToalDislike(point);
                    }
                    else
                    {
                        user.setTotalLike(point);
                    }

        }
        
        callback(null, user);
    }
    catch (ex)
    {
        callback(ex);
    }
    
    
    
    
}