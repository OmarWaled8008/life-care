import winston from 'winston';
import { format } from 'date-fns';
import dotenv from 'dotenv';
dotenv.config();

const logFilePath = process.env.LOG_FILE_PATH;
//console.log('Log file path:', logFilePath);

const dateFormat = () => {
    return format(new Date(), 'yyyy-MM-dd HH:mm:ss');
};

class LoggerService {
    private route: any;
    private logger: winston.Logger;

    constructor(route: any) {
        this.route = route;
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.printf(info => {
                let message = ` ${dateFormat()} | ${info.level.toUpperCase()} | ${info.message} `;
                message = info.obj ? message + `data ${JSON.stringify(info.obj)} |` : message;
                return message;
            }),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({
                    filename: `${logFilePath}/${this.route.log}.log`,
                    handleExceptions: true,
                }),
            ],
        });
    }   

    // logging messages at different log levels

    async info(message: string, obj?: any) {
        this.logger.log('info', message, { obj });
    }

    async error(message: string, obj?: any) {
        this.logger.log('error', message, { obj });
    }

    async debug(message: string, obj?: any) {
        this.logger.log('debug', message, { obj });
    }
}

export default LoggerService;
