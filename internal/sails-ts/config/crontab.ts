/**
 * Crontab configuration for async checker
 */

interface CronJob {
  interval: string;
  service: string;
  method: string;
}

interface CrontabConfig {
  enabled: boolean;
  crons: () => CronJob[];
}

const crontabConfig: CrontabConfig = {
  enabled: false, //enable this to register async checker at bootstrap
  crons: function () {
    return [
      { interval: '1 * * * * * ', service: 'workspaceasyncservice', method: 'loop' }
    ];
  }
};

module.exports.crontab = crontabConfig;
