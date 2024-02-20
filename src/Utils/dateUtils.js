import moment from 'moment-timezone';

const convertToBuenosAiresTime = (dateString) => {
  const date = moment.tz(dateString, 'America/Argentina/Buenos_Aires');
  const timeAgo = date.fromNow();
  return `${timeAgo}`;
};

export default convertToBuenosAiresTime;