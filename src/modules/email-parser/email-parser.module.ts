import { Module } from '@nestjs/common';
import { EmailParserController } from './controllers/email-parser.controller';
import { EmailParserService } from './services/email-parser.service';

@Module({
  providers: [EmailParserService],
  controllers: [EmailParserController],
})
export class EmailParserModule {}
