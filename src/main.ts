import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';
import * as cookieParser from 'cookie-parser';
import { winstonLoggerConfig } from './config/winston.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: winstonLoggerConfig
    });

    setupSwagger(app);

    app.enableCors({ origin: true });

    app.useGlobalPipes(
        // class-validator
        new ValidationPipe({
            whitelist: true,
            transform: true,
            disableErrorMessages: true
        })
    );

    app.use(cookieParser());

    await app.listen(process.env.PORT);
}

bootstrap();
