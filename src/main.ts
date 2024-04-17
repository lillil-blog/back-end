import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    setupSwagger(app);

    app.enableCors({ origin: true });

    app.use(cookieParser());

    await app.listen(process.env.PORT);
}
//test
bootstrap();
