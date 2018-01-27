const mediaEmptyForUser = (res) => {
    res.status(404).json({
        success: false,
        message: 'no media found'
    });
}

const mediaNotFound = (res) => {
    res.status(404).json({
        success: false,
        message: 'media not found'
    });
}

const mediaRetrieveSuccess = (res, media) => {
    res.status(200).json({
        success: true,
        data: media
    });
}

const mediaSaveInvalid = (res) => {
    return res.status(400).json({
        success: false,
        message: 'Invalid Request, provide all fields'
    });
}

const mediaSaveSuccess = (res, media) => {
    return res.status(201).json({
        success: true,
        data: media
    });
}

const mediaServerError = (res, err) => {
    return res.status(500).json({
        success: false,
        message: err.message
    });
}

export {
    mediaEmptyForUser,
    mediaNotFound,
    mediaRetrieveSuccess,
    mediaSaveInvalid,
    mediaSaveSuccess,
    mediaServerError,
}