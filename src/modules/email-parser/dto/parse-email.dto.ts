import { IsString } from 'class-validator';

export class ParseEmailDto {
  @IsString()
  emailPath: string;
}
