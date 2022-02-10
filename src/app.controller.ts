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
    console.log(request, body);

    const [file] = files.files;

    const writeDir = path.resolve(__dirname, `../upload/${dayjs().format('YYYY-MM-DD')}/${body.filename}`)

    console.log(writeDir)
    fs.mkdirSync(writeDir, {
      recursive: true,
    });
    const writePath = path.resolve(
      __dirname,
      `../upload/${dayjs().format('YYYY-MM-DD')}/${body.filename}/${body.chunk} - ${body.filename}`,
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
  async mergeFile(@Body() body: mergeFileQuery) {
    const { size, filename } = body;

    const dirPath = path.resolve(
      __dirname,
      `../upload/2022-02-10/[BeanSub&FZSD][Kimetsu_no_Yaiba][35][GB][1080P][x264_AAC].mp4`,
    );

    const fileList = fs.readdirSync(dirPath)
      .sort((a, b) => {
        const chunk1 = +a.match(/(\d+)/g)[0]
        const chunk2 = +b.match(/(\d+)/g)[0]

        return chunk1 - chunk2
      })

    const data = fileList.map((file, index) => {

      return new Promise((resolve) => {
        const filePath = path.resolve(dirPath, file)
        fs.readFile(filePath, (err, buffer) => {
          fs.appendFile('./upload/c.mp4', buffer, () => {
            resolve('end')
          })
        })

        // // console.log(read)

        //     resolve('end')
        //   const readStream = fs.createReadStream(filePath)

        //   // console.log(index * size, index + 1 * size)
        //   const writeStream = fs.createWriteStream(
        //     './upload/b.mp4'
        //   )

        //   readStream.on('error', (stream) => {
        //     console.log(stream)
        //   })
        //   readStream.on('end', () => {
        //     resolve('end')
        //     console.log('end')
        //   })

        //   // console.log(readStream, writeStream)

        //   readStream.pipe(writeStream, {
        //     end: false
        //   })
      })

    })

    await Promise.all(data)


    return body;
  }
}
