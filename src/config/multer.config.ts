import { Injectable } from '@nestjs/common';
import { MulterOptionsFactory } from '@nestjs/platform-express';
import * as path from 'path';
import * as fs from 'fs';
import * as multer from 'multer';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

@Injectable()
export class MulterConfig implements MulterOptionsFactory {
    dirPath: string;

    constructor() {
        this.dirPath = path.join(process.cwd(), 'uploads');
        this.mkdir();
    }

    mkdir() {
        try {
            fs.readdirSync(this.dirPath);
        } catch (error) {
            fs.mkdirSync(this.dirPath);
        }
    }

    createMulterOptions(): MulterOptions | Promise<MulterOptions> {
        const dirPath = this.dirPath;
        const options = {
            storage: multer.diskStorage({
                destination(_req, _file, done) {
                    done(null, dirPath);
                },
                filename(_req, file, done) {
                    const ext = path.extname(file.originalname);
                    const name = path.basename(file.originalname, ext);
                    done(null, `${name}_${Date.now()}${ext}`);
                }
            }),
            limits: {
                /** any limit options... */
            }
        };
        return options;
    }
}
