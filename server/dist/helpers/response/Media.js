'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var mediaEmptyForUser = function mediaEmptyForUser(res) {
    res.status(404).json({
        success: false,
        message: 'no media found'
    });
};

var mediaNotFound = function mediaNotFound(res) {
    res.status(404).json({
        success: false,
        message: 'media not found'
    });
};

var mediaRetrieveSuccess = function mediaRetrieveSuccess(res, media) {
    res.status(200).json({
        success: true,
        data: media
    });
};

var mediaSaveInvalid = function mediaSaveInvalid(res) {
    return res.status(400).json({
        success: false,
        message: 'Invalid Request, provide all fields'
    });
};

var mediaSaveSuccess = function mediaSaveSuccess(res, media) {
    return res.status(201).json({
        success: true,
        data: media
    });
};

var mediaServerError = function mediaServerError(res, err) {
    return res.status(500).json({
        success: false,
        message: err.message
    });
};

exports.mediaEmptyForUser = mediaEmptyForUser;
exports.mediaNotFound = mediaNotFound;
exports.mediaRetrieveSuccess = mediaRetrieveSuccess;
exports.mediaSaveInvalid = mediaSaveInvalid;
exports.mediaSaveSuccess = mediaSaveSuccess;
exports.mediaServerError = mediaServerError;