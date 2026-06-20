import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  health() {
    return {
      name: 'WeatherGuard Admin API',
      status: 'ok',
    };
  }
}
