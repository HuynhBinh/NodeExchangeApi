"use strict";
var sql = require('mssql');
var User = require('../model/User.js');
var Address = require('../model/Address.js');
var Phone = require('../model/Phone.js');
var Result = require('../model/Result.js');
var config = require('./config.js');


exports.addNewAddress = function (req, res)
{
    var username = req.body.username;
    var password = req.body.password;
    var countryid = req.body.countryid;
    var cityid = req.body.cityid;
    var districtid = req.body.districtid;
    var street = req.body.street;
    var note = req.body.note;
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    
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
        
        request.input("username", sql.NVarChar(20), username);
        request.input("countryid", sql.NVarChar(2), countryid);
        request.input("cityid", sql.NVarChar(3), cityid);
        request.input("districtid", sql.NVarChar(3), districtid);
        request.input("street", sql.NVarChar(100), street);
        request.input("note", sql.NVarChar(100), note);
        request.input("location", sql.NVarChar(100), point);
        
        request.execute("user_AddressAdd").then(function (recordsets)
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

exports.updateAddress = function (req, res)
{
    var addressid = req.body.addressid;
    var username = req.body.username;
    var password = req.body.password;
    var countryid = req.body.countryid;
    var cityid = req.body.cityid;
    var districtid = req.body.districtid;
    var street = req.body.street;
    var note = req.body.note;
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    
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
        
        request.input("addressid", sql.NVarChar(20), addressid);
        request.input("username", sql.NVarChar(20), username);
        request.input("countryid", sql.NVarChar(1), countryid);
        request.input("cityid", sql.NVarChar(2), cityid);
        request.input("districtid", sql.NVarChar(3), districtid);
        request.input("street", sql.NVarChar(100), street);
        request.input("note", sql.NVarChar(100), note);
        request.input("location", sql.NVarChar(100), point);
        
        request.execute("user_AddressUpdate").then(function (recordsets)
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

exports.deleteAddress = function (req, res)
{
    var addressid = req.body.addressid;
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
        
        request.input("addressid", sql.NVarChar(20), addressid);
        request.input("username", sql.NVarChar(20), username);
        request.input("password", sql.NVarChar(20), password);
        
        
        request.execute("user_AddressDelete").then(function (recordsets)
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


exports.getAllAddress = function (req, res)
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
        
        request.execute("user_AddressGetAll").then(function (recordsets)
        {
            if (recordsets.length > 0)
            {
                var tblAddress = recordsets[0];
                
                
                var addresses = new Array();
                
                for (var row of tblAddress)
                    {                  
                        var id = row.AddressID;
                        var lat = row.Latitude;
                        var lng = row.Longitude;
                        var country = row.CountryName;
                        var city = row.CityName;                
                        var district = row.DistrictName;
                        var ward = row.Ward;
                        var street = row.Street;
                        var note = row.Note;

                        var address = new Address(id, lat, lng, country, city, district, ward, street, note);
                                     
                        addresses.push(address);
                    }
                
                config.responseWithData(res, addresses);

               
                             
            }
            else
            {
                config.responseWithError(res, config.unknownError);
            }
        });
    });
}

function toGeometry(latitude, longitude, callback)
{
    var point = '';
    point += 'POINT(';
    point += longitude;
    point += ' ';
    point += latitude;
    point += ')';
    
    callback(point);
}