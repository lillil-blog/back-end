import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfig } from 'src/config/multer.config';
import { FileController } from 'src/domain/files/controller/file.controller';
import { FileService } from 'src/domain/files/service/file.service';

@Module({
    imports: [
        MulterModule.registerAsync({
            useClass: MulterConfig
        })
    ],
    controllers: [FileController],
    providers: [FileService]
})
export class FileModule {}
