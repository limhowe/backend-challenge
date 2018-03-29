import moment from 'moment';

export function getDateOfNextHour(dateString) {
  return {
    current: moment(dateString).toDate(),
    next: moment(dateString).add(1, 'hours').toDate(),
  };
}

export function getRange(from, to) {
  return {
    current: moment(from).toDate(),
    next: moment(to).toDate(),
  };
}
