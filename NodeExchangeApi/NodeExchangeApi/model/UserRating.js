"use strict";

class UserRating {
constructor(ratingId, point, username, ratingUsername, ratingDate) {
    this.RatingID = ratingId;
    this.Point = point;
    this.Username = username;
    this.RatingUsername = ratingUsername;
    this.RatingDate = ratingDate;
}
}

var method = UserRating.prototype;

module.exports = UserRating;

