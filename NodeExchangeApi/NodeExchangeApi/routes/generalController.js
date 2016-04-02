"use strict";
var sql = require('mssql');
var User = require('../model/User.js');
var Address = require('../model/Address.js');
var Phone = require('../model/Phone.js');
var Result = require('../model/Result.js');
var config = require('./config.js');


exports.getAllCountryCityDistrict = function (req, res)
{
    var countryid = req.body.countryid;
    
    var connection = new sql.Connection(config.connectionString);
    
    connection.connect(function (err)
    {
        if (err)
        {
            config.responseWithError(res, err);
        }
        
        var request = new sql.Request(connection);
        
        request.input("countryid", sql.Int, countryid);
        
        request.execute("general_GetCountryCityDistrict").then(function (recordsets)
        {
            if (recordsets.length > 1)
            {
                var tblCountry = recordsets[0];
                var tblCity = recordsets[1];
                var tblDistrict = recordsets[2];
                
                extractData(tblCountry, tblCity, tblDistrict, function (err, data)
                {
                    if (err)
                    {
                        config.responseWithError(res, err);
                    }
                    
                    config.responseWithData(res, data);
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
}


function extractData(tblCountry, tblCity, tblDistrict, callback)
{
    var data;
    
    data = {
        Country : tblCountry,
        City : tblCity,
        District : tblDistrict
    }
    callback(null, data);
}