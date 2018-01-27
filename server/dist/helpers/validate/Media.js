"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var mediaIsGood = function mediaIsGood(req) {
    var media = req.body;
    var mediaIsComplete = media.title && media.type && media.link;
    return mediaIsComplete;
};

exports.mediaIsGood = mediaIsGood;