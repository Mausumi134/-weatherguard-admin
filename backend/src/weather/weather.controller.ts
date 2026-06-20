import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { USER_ROLES } from '../common/constants';
import { WeatherService } from './weather.service';

@Controller('weather')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(USER_ROLES.ADMIN)
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('alerts')
  findRecentAlerts() {
    return this.weatherService.findRecentAlerts();
  }

  @Post('trigger-demo')
  triggerDemoAlerts() {
    return this.weatherService.generateAlerts('manual');
  }
}
