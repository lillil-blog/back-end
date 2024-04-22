import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import * as path from 'path';

@Controller('/files')
export class FileController {
    private basePath = 'public';

    constructor() {}

    @Post('/users/upload')
    @UseInterceptors(FileInterceptor('image'))
    async userImageUpload(@UploadedFile() file: Express.Multer.File) {
        const relativePath = path.relative(this.basePath, file.path);

        return relativePath;
    }

    @Post('/boards/upload')
    @UseInterceptors(FilesInterceptor('images'))
    async boardImageUpload(@UploadedFiles() files: Express.Multer.File[]) {
        const relativePaths = files.map((item) => path.relative(this.basePath, item.path));

        return relativePaths;
    }
}
