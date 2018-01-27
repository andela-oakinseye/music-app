import moment from 'moment';

const login = (userInfo) => {
    return {
        to: userInfo.email,
        subject: 'BREAKOUT - Login Notification',
        html: `
            <p> Hello <strong> ${ userInfo.firstname }, </strong> </p>
            <p> You logged into your account on <strong> ${ moment(Date.now()).format('lll') } </strong> </p>
        `
    }  
}

const register = (userInfo) => {
    return {
        to: userInfo.email,
        subject: 'Welcome to Breakout!',
        html: `
            <p> Hello <strong> ${ userInfo.firstname }, </strong> </p>
            <p> Thank you for joining Breakout </p>
            <p> Your username is <strong> ${ userInfo.username } </strong> </p>
        `
    }
}

const comment = (commentInfo) => {
    return {
        to: commentInfo.mediaOwnerEmail,
        subject: 'BREAKOUT - New Comment',
        html: `
            <p> Hello <strong> ${ user.mediaOwnerName }, </strong> </p>
            <p> ${ commentInfo.commenterUsername } left a comment on ${ commentInfo.mediaName } </p>
            <p> Please login to Breakout to view the comment </p>
        `
    }
}

const rating = (ratingInfo) => {
    return {
        to: ratingInfo.mediaOwnerEmail,
        subject: 'BREAKOUT - New Rating',
        html: `
            <p> Hello <strong> ${ ratingInfo.mediaOwnerName }, </strong> </p>
            <p> ${ ratingInfo.raterUsername } left a comment on ${ ratingInfo.mediaName } </p>
            <p> Please login to Breakout to view the rating </p>
        `
    }
}

export {
    login,
    register,
    comment,
    rating,
}