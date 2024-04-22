import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfig } from 'src/config/multer.config';
import { FileController } from 'src/domain/files/controller/file.controller';

@Module({
    imports: [
        MulterModule.registerAsync({
            useClass: MulterConfig
        })
    ],
    controllers: [FileController]
})
export class FileModule {}
