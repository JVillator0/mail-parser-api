import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('/status', () => {
    it('should return API status', () => {
      const response = appController.getStatus();
      expect(response).toHaveProperty('status', 'ok');
      expect(response).toHaveProperty('timestamp');
      expect(typeof response.timestamp).toBe('string');
    });
  });
});
