"use strict";

class Phone {
constructor(phoneNumber, phoneType, isDisplay) {
    this.PhoneNumber = phoneNumber;
    this.PhoneType = phoneType;
    this.IsDisplay = isDisplay;
}
}


var method = Phone.prototype;


module.exports = Phone;

