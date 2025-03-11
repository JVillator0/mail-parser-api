import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ParseEmailDto } from '../dto/parse-email.dto';
import { EmailParserService } from '../services/email-parser.service';

@ApiTags('Email Parser')
@Controller('email-parser')
export class EmailParserController {
  constructor(private readonly emailParserService: EmailParserService) {}

  @Post('parse')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Parses an email and extracts JSON' })
  @ApiResponse({ status: 200, description: 'JSON extracted from the email' })
  @ApiResponse({ status: 204, description: 'No JSON found in the email' })
  @ApiResponse({ status: 400, description: 'Incorrect format' })
  async parseEmail(@Body() parseEmailDto: ParseEmailDto) {
    const jsonData = await this.emailParserService.parseEmail(
      parseEmailDto.emailPath,
    );

    if (!jsonData) {
      throw new HttpException('', 204);
    }

    return jsonData;
  }
}
