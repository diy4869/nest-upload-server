import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        // 配置文件上传后的文件夹路径
        destination: `./upload`,
        filename: (req, file, cb) => {
          // 在此处自定义保存后的文件名称
          console.log(file);
          const filename = `${file.originalname}.${
            file.mimetype.split('/')[1]
          }`;
          return cb(null, filename);
        },
      }),
    }),

    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './upload',
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
