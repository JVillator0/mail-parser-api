import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import { join } from 'path';
import { EmailParserService } from './email-parser.service';

// Mock the HTTP request
jest.mock('axios');

describe('EmailParserService', () => {
  let service: EmailParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailParserService],
    }).compile();

    service = module.get<EmailParserService>(EmailParserService);
  });

  it('should parse a JSON attachment from a local .eml file', async () => {
    const emailPath = join(
      __dirname,
      '../../../../test/data/json-attached.eml',
    );
    const jsonData = await service.parseEmail(emailPath);

    expect(jsonData).toBeDefined();
    expect(jsonData).toHaveProperty('clients');

    if (jsonData) {
      expect(jsonData.clients).toEqual([
        { name: 'John Doe' },
        { name: 'Jane Doe' },
      ]);
    }
  });

  it('should extract JSON from a URL inside the email body', async () => {
    const emailPath = join(__dirname, '../../../../test/data/json-in-body.eml');

    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: { clients: [{ name: 'John Doe' }, { name: 'Jane Doe' }] },
    });

    const jsonData = await service.parseEmail(emailPath);

    expect(jsonData).toBeDefined();
    expect(jsonData).toHaveProperty('clients');

    if (jsonData) {
      expect(jsonData.clients).toEqual([
        { name: 'John Doe' },
        { name: 'Jane Doe' },
      ]);
    }
  });

  it('should return null if no JSON is found', async () => {
    const emailPath = join(__dirname, '../../../../test/data/without-json.eml');
    await expect(service.parseEmail(emailPath)).resolves.toBeNull();
  });
});
