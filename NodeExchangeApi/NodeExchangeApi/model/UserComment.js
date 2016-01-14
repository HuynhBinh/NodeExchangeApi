"use strict";

class UserComment {
constructor(commentId, commentContent, username, commentUsername, commentDate) {
    this.CommentID = commentId;
    this.CommentContent = commentContent;
    this.Username = username;
    this.CommentUsername = commentUsername;
    this.CommentDate = commentDate;
}
}

var method = UserComment.prototype;

module.exports = UserComment;

