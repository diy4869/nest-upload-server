import {
  Body,
  Controller,
  Post,
  Req,
  Request,
  // UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

import { AppService } from './app.service';
import fs = require('fs');
import path = require('path');
import dayjs = require('dayjs');

interface uploadFileQuery {
  hash: string;
  chunk: string;
  filename: string;
}

interface mergeFileQuery {
  size: number;
  filename: number;
}

@Controller()
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly appService: AppService) { }

  @Post('/upload')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'files' }]))
  uploadFile(
    @Req() request,
    @Body() body: uploadFileQuery,

    @UploadedFiles() files: { files: Array<Express.Multer.File> },
  ) {
    console.log(body);

    const [file] = files.files;

    const writeDir = path.resolve(__dirname, `../upload/${dayjs().format('YYYY-MM-DD')}/${body.filename}`)
    
    fs.mkdirSync(writeDir, {
      recursive: true,
    });
    const writePath = path.resolve(
      __dirname,
      `../upload/${dayjs().format('YYYY-MM-DD')}/${body.chunk} - ${body.filename}`,
    );

    console.log(writePath);
    //  const readStream = fs.createReadStream(writePath);
    // const writeStream = fs.createWriteStream(writePath);

    // readStream.pipe(writeStream);
    fs.writeFile(writePath, file.buffer, (err) => {
      console.log(err);
    });
    // console.log(readStream, writeStream);
    return files;
  }

  @Post('/mergeFiles')
  mergeFile(@Body() body: mergeFileQuery) {
    const { size, filename } = body;

    console.log(body);
    return 'hello world';
  }
}
