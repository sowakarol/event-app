import winston from 'winston';

import winstonConfig from '../../config/winston';

const logger = winston.createLogger(winstonConfig);

export default logger;
