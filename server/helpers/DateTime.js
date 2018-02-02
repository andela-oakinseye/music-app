import moment from 'moment';

const format = (datetime) => moment(datetime).format('lll');
export {
    format,
}