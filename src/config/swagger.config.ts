import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
    const options = new DocumentBuilder().setTitle('D.S. TechBlog API Docs').setVersion('1.0.1').build();

    const document = SwaggerModule.createDocument(app, options);

    // 첫 번째 파라미터 SwaggerUI를 마운트하는 경로를 지정할 수 있다.
    // 'api-docs' --> http://localhost:3000/api-docs
    SwaggerModule.setup('api-docs', app, document, {
        customCss: '.swagger-ui input[type="text"] { display: none; }', // input type text인 텍스트박스들 제거
        swaggerOptions: {
            supportedSubmitMethods: [] // Try it out 버튼 표시할 HTTP Methods...
        }
    });
}
