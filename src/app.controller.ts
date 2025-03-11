import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Status')
@Controller()
export class AppController {
  @Get('status')
  @ApiOperation({
    summary: 'Health check: Verifies the status of the application',
  })
  getStatus() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}
