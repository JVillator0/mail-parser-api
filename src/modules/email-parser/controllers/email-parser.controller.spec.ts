import { Test, TestingModule } from '@nestjs/testing';
import { join } from 'path';
import { ParseEmailDto } from '../dto/parse-email.dto';
import { EmailParserService } from '../services/email-parser.service';
import { EmailParserController } from './email-parser.controller';

describe('EmailParserController', () => {
  let controller: EmailParserController;
  let service: EmailParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailParserController],
      providers: [
        {
          provide: EmailParserService,
          useValue: {
            parseEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<EmailParserController>(EmailParserController);
    service = module.get<EmailParserService>(
      EmailParserService,
    ) as jest.Mocked<EmailParserService>;
  });

  it('should return parsed JSON from service', async () => {
    const emailPath = join(__dirname, '../../../../test/data/json-in-body.eml');
    const mockResponse = {
      clients: [{ name: 'John Doe' }, { name: 'Jane Doe' }],
    };

    (service.parseEmail as jest.Mock).mockResolvedValue(mockResponse);

    const dto: ParseEmailDto = { emailPath };
    const response = await controller.parseEmail(dto);

    expect(response).toEqual(mockResponse);
    jest.spyOn(service, 'parseEmail').mockResolvedValue(mockResponse);
  });

  it('should handle errors and throw an exception', async () => {
    const emailPath = join(__dirname, '../../../../test/data/without-json.eml');
    (service.parseEmail as jest.Mock).mockRejectedValue(
      new Error('No JSON found in the email.'),
    );

    const dto: ParseEmailDto = { emailPath };

    await expect(controller.parseEmail(dto)).rejects.toThrow(
      'No JSON found in the email.',
    );
  });
});
