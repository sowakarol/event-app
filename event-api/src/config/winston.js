import { format, transports } from 'winston';

const winstonConfig = {
  transports: [
    new transports.Console(),
  ],
  format: format.combine(
    format.timestamp({ format: 'MM-DD-YYYY HH:mm:ss' }),
    format.align(),
    format.printf((log) => `${log.timestamp}: ${log.level.toUpperCase()}: ${log.message}`),
  ),
};

export default winstonConfig;
