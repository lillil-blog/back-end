import { Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('/files')
export class FileController {
    constructor() {}

    @Post('/upload')
    @UseInterceptors(FilesInterceptor('files'))
    async pload(@UploadedFiles() files: Express.Multer.File[]) {
        files.map((item) => console.log(item.path));
        return { msg: 'succ' };
    }
}
/**
 * @TODO 파일 컨트롤러랑 서비스 저장 이름, 방식, ext 등 생각해볼 것
 */
