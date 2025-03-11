import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EmailParserModule } from './modules/email-parser/email-parser.module';

@Module({
  imports: [EmailParserModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
