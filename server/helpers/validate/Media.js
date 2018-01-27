const mediaIsGood = (req) => {
    const media = req.body;
    const mediaIsComplete = media.title && media.type && media.link;
    return mediaIsComplete;
}

export {
    mediaIsGood,
}