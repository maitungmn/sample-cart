import appRoot from 'app-root-path';
import winston from 'winston';

const options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

// instantiate a new Winston Logger with the settings defined above
const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

export class LoggerStream {
  // eslint-disable-next-line class-methods-use-this
  write(message: string) {
    logger.info(message.replace(/"/g, "'").substring(0, message.lastIndexOf('\n')));
  }
}
