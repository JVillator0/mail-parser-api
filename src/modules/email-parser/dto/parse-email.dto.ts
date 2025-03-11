import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ParseEmailDto {
  @IsString()
  @ApiProperty({
    example: 'https://example.com/test-email.eml',
    description: 'URL of the email to be parsed',
  })
  emailPath: string;
}
