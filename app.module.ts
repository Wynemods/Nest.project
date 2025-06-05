import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';
import { MembersModule } from './members/members.module';

@Module({
  imports: [BooksModule, AuthorsModule, MembersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
