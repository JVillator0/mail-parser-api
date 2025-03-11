import { Body, Controller, Post } from '@nestjs/common';
import { ParseEmailDto } from '../dto/parse-email.dto';
import { EmailParserService } from '../services/email-parser.service';

@Controller('email-parser')
export class EmailParserController {
  constructor(private readonly emailParserService: EmailParserService) {}

  @Post('parse')
  async parseEmail(@Body() parseEmailDto: ParseEmailDto) {
    return this.emailParserService.parseEmail(parseEmailDto.emailPath);
  }
}
