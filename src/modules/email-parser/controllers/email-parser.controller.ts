import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ParseEmailDto } from '../dto/parse-email.dto';
import { EmailParserService } from '../services/email-parser.service';

@ApiTags('email-parser')
@Controller('email-parser')
export class EmailParserController {
  constructor(private readonly emailParserService: EmailParserService) {}

  @Post('parse')
  @ApiOperation({ summary: 'Parses an email and extracts JSON' })
  @ApiResponse({ status: 200, description: 'JSON extracted from the email' })
  @ApiResponse({ status: 400, description: 'Incorrect format' })
  async parseEmail(@Body() parseEmailDto: ParseEmailDto) {
    return this.emailParserService.parseEmail(parseEmailDto.emailPath);
  }
}
