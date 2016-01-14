"use strict";

class Address 
{
constructor(addressId, lat, lng, countryId, cityId, districtId, ward, street, note) {
    this.AddressID = addressId;
    this.Latitude = lat;
    this.Longitude = lng;
    this.CountryID = countryId;
    this.CityID = cityId;
    this.DistrictID = districtId;
    this.Ward = ward;
    this.Street = street;
    this.Note = note;
}
}


var method = Address.prototype;

module.exports = Address;

