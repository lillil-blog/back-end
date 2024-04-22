import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';
import * as winstonDaily from 'winston-daily-rotate-file';
import * as path from 'path';

const logDir = path.join(process.cwd(), 'logs');

const dailyOptions = (level: string) => {
    const options = {
        // 표시할 로그 레벨
        level,
        // 로그의 날짜 패턴
        datePattern: 'YYYY-MM-DD',
        // 로그 저장 위치
        dirname: `${logDir}/${level}`,
        // 로그 저장 파일명
        filename: `%DATE%.${level}.log`,
        // 30일치 로그만 저장
        maxFiles: 30,
        // 로그가 쌓이면 압축
        zippedArchive: true,
        // 파일에 기록하는 형식 정의
        format: winston.format.combine(
            winston.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            winston.format.printf((info) => {
                const { level, timestamp, context, message, stack } = info;

                return stack
                    ? `[DSTB] ${level.toUpperCase()} ${timestamp} [${context}] ${message}\n${stack}`
                    : `[DSTB] ${level.toUpperCase()} ${timestamp} [${context}] ${message}`;
            })
        )
    };

    return options;
};

export const winstonLoggerConfig = WinstonModule.createLogger({
    transports: [
        // 콘솔에 찍어주기용
        new winston.transports.Console({
            level: 'http',
            // format: winston.format.simple()
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.colorize(),
                utilities.format.nestLike('DSTB', {
                    prettyPrint: true //nest에서 제공하는 옵션, 로그 가독성을 높임
                })
            )
        }),

        // info 이하레벨 전체 로깅용
        new winstonDaily(dailyOptions('info')),
        // error 레벨은 치명적이기에 따로 보관
        new winstonDaily(dailyOptions('error'))
    ]
});
