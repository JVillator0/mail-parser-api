import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ParseEmailDto {
  @IsString()
  @IsNotEmpty({ message: 'emailPath is required' })
  @ApiProperty({
    example: 'https://example.com/test-email.eml',
    description: 'URL of the email to be parsed',
  })
  emailPath: string;
}
