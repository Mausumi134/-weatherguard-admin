import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { ALERT_SEVERITY, INVITE_STATUS, USER_ROLES } from '../common/constants';

const WEATHER_EVENTS = [
  {
    condition: 'Heavy rain',
    temperature: 24,
    severity: ALERT_SEVERITY.HIGH,
    message: 'Heavy rainfall expected. Ask field teams to avoid low-lying roads.',
  },
  {
    condition: 'Heatwave',
    temperature: 42,
    severity: ALERT_SEVERITY.HIGH,
    message: 'High temperature alert. Keep water and shade available for crews.',
  },
  {
    condition: 'Thunderstorm',
    temperature: 29,
    severity: ALERT_SEVERITY.MEDIUM,
    message: 'Storm activity detected. Review outdoor operations before dispatch.',
  },
  {
    condition: 'Strong winds',
    temperature: 27,
    severity: ALERT_SEVERITY.MEDIUM,
    message: 'Wind gusts may affect open sites and temporary structures.',
  },
  {
    condition: 'Clear',
    temperature: 31,
    severity: ALERT_SEVERITY.LOW,
    message: 'No severe weather detected for now.',
  },
];

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);
  private eventIndex = 0;

  constructor(private readonly prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async runScheduledAlertCheck() {
    const result = await this.generateAlerts('scheduled');
    if (result.created > 0) {
      this.logger.log(`Created ${result.created} scheduled weather alerts.`);
    }
  }

  async generateAlerts(source: 'scheduled' | 'manual' = 'manual') {
    const approvedUsers = await this.prisma.user.findMany({
      where: {
        role: USER_ROLES.USER,
        status: INVITE_STATUS.APPROVED,
      },
      orderBy: { createdAt: 'asc' },
    });

    if (!approvedUsers.length) {
      return {
        source,
        created: 0,
        alerts: [],
      };
    }

    const alerts = await Promise.all(
      approvedUsers.map((user, index) => {
        const event = WEATHER_EVENTS[
          (this.eventIndex + index) % WEATHER_EVENTS.length
        ];

        return this.prisma.weatherAlert.create({
          data: {
            userId: user.id,
            city: user.city,
            condition: event.condition,
            temperature: event.temperature,
            severity: event.severity,
            message: event.message,
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                city: true,
              },
            },
          },
        });
      }),
    );

    this.eventIndex = (this.eventIndex + 1) % WEATHER_EVENTS.length;

    return {
      source,
      created: alerts.length,
      alerts,
    };
  }

  async findRecentAlerts() {
    return this.prisma.weatherAlert.findMany({
      orderBy: { createdAt: 'desc' },
      take: 25,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            city: true,
          },
        },
      },
    });
  }
}
