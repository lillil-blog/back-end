import { Controller, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import * as path from 'path';
import { JWTAccessGuard } from 'src/middleware/auth/guard/jwt.access.guard';

@Controller('/files')
@ApiTags('File Upload API')
// @UseGuards(JWTAccessGuard)
export class FileController {
    private basePath = 'public';

    constructor() {}

    @Post('/users/upload')
    @ApiOperation({
        summary: '유저 사진 등록',
        description: '단일 사진(파일)만 가능하며 유저의 썸네일 등록을 위해 사용합니다.'
    })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                image: {
                    type: 'file',
                    format: 'binary'
                }
            },
            description: '업로드할 썸네일 파일(단일)'
        }
    })
    @UseInterceptors(FileInterceptor('image'))
    async userImageUpload(@UploadedFile() file: Express.Multer.File) {
        const relativePath = path.relative(this.basePath, file.path);

        return relativePath;
    }

    @Post('/boards/upload')
    @ApiOperation({
        summary: '포스트 이미지 업로드',
        description: '포스트의 여러 게시물을 업로드합니다. 이미지 파일을 배열로 받습니다.'
    })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                images: {
                    type: 'array',
                    items: {
                        type: 'file',
                        format: 'binary'
                    },
                    description: '업로드할 이미지 파일들'
                }
            }
        }
    })
    @UseInterceptors(FilesInterceptor('images'))
    async boardImageUpload(@UploadedFiles() files: Express.Multer.File[]) {
        const relativePaths = files.map((item) => path.relative(this.basePath, item.path));

        return relativePaths;
    }
}
