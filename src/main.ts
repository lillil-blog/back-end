import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    setupSwagger(app);

    app.enableCors({ origin: true });

    await app.listen(process.env.PORT);
}

bootstrap();
