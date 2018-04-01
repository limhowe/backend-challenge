import schedule from 'node-schedule';
import importJob from './import.job';

const runJob = async() => {
  const rule = new schedule.RecurrenceRule();
  rule.minute = 48;
  schedule.scheduleJob(rule, importJob);
};

export default runJob;
