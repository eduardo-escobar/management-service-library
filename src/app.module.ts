import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksController } from './books/books.controller';
import { BooksService } from './books/books.service';
import { EasyconfigModule } from  'nestjs-easyconfig';

@Module({
  imports: [EasyconfigModule.register({path: './config/.env'})],
  controllers: [AppController, BooksController],
  providers: [AppService, BooksService],
})
export class AppModule {}
