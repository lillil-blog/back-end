import { Module } from '@nestjs/common';
import { ServeStaticModule as NestServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
    imports: [
        NestServeStaticModule.forRoot({
            rootPath: path.join(__dirname, '../../public'),
            serveRoot: '/public',
            serveStaticOptions: {
                index: false
            }
        })
    ]
})
export class ServeStaticModule {}
