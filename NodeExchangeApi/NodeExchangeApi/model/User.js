"use strict";

class User
{
    constructor(username, password, displayName, email, desc, avatar, isPublic, facebook, twitter, instagram)
    {
        this.Username = username;
        this.Password = password;
        this.DisplayName = displayName;
        this.Email = email;
        this.Description = desc;
        this.AvatarLink = avatar;
        this.IsPublic = isPublic;
        this.FaceBookLink = facebook;
        this.TwitterLink = twitter;
        this.InstagramLink = instagram;
        this.TotalLike = 0;
        this.TotalDislike = 0;
    }
}

var method = User.prototype;

method.setTotalLike = function (number)
{
    this.TotalLike = number;
}

method.setToalDislike = function (number)
{
    this.TotalDislike = number;
}

method.setPhones = function (phones)
{
    this.Phones = phones;
};

method.getPhones = function ()
{
    return this.Phones;
}


method.setAddresses = function (addresses)
{
    this.Addresses = addresses;
};


method.getAddresses = function ()
{
    return this.Addresses;
}

method.setComments = function (comments)
{
    this.Comments = comments;
}

method.getComments = function ()
{
    return this.Comments;
}

method.getRatings = function ()
{
    return this.Ratings;
}

method.setRatings = function (ratings)
{
    this.Ratings = ratings;
}

module.exports = User;