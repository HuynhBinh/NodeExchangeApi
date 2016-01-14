"use strict";
class Result {
constructor(stt, msg, data) {
    this.stt = stt;
    this.msg = msg;
    this.data = data;
}
}
var method = Result.prototype;
module.exports = Result;