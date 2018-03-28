import moment from 'moment';

export function getDateOfNextHour(dateString) {
  return {
    current: moment(dateString).toDate(),
    next: moment(dateString).add(1, 'hours').toDate(),
  };
}
