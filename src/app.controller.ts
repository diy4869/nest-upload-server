import {
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

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/upload')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'files' }]))
  uploadFile(
    @Req() request: Request,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    // console.log(request);
    console.log(files);
    return files;
  }
}
