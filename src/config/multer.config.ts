import { Injectable } from '@nestjs/common';
import { MulterOptionsFactory } from '@nestjs/platform-express';
import * as path from 'path';
import * as fs from 'fs';
import * as multer from 'multer';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { Request } from 'express';

@Injectable()
export class MulterConfig implements MulterOptionsFactory {
    private dirPath: string;

    constructor() {
        this.dirPath = path.join(process.cwd(), 'public/images');

        this.ensureDir(this.dirPath);
        this.ensureDir(path.join(this.dirPath, 'boards'));
        this.ensureDir(path.join(this.dirPath, 'users'));
        this.ensureDir(path.join(this.dirPath, 'temp'));
    }

    private ensureDir(dir: string) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    }

    createMulterOptions(): MulterOptions | Promise<MulterOptions> {
        const dirPath = this.dirPath;
        const options = {
            storage: multer.diskStorage({
                destination(req, _file, callback) {
                    if (req.originalUrl.includes('/boards')) {
                        callback(null, `${dirPath}/boards`);
                    } else if (req.originalUrl.includes('/users')) {
                        callback(null, `${dirPath}/users`);
                    } else {
                        callback(null, `${dirPath}/temp`);
                    }
                },
                filename(_req, file, callback) {
                    const ext = path.extname(file.originalname);
                    const name = path.basename(file.originalname, ext);

                    callback(null, `${name}_${Date.now()}${ext}`);
                }
            }),
            fileFilter(req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback) {
                const allowedMimeTypes = ['image/jpeg', 'image/png'];
                if (allowedMimeTypes.includes(file.mimetype)) {
                    callback(null, true);
                } else {
                    callback(null, false);
                }
            },
            limits: {
                // fileSize: 10 * 1024 * 1024 //10 MB
            }
        };
        return options;
    }
}
