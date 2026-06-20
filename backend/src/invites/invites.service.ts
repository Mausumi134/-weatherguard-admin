import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { INVITE_STATUS, USER_ROLES } from '../common/constants';
import { sanitizeUser } from '../common/sanitize-user';
import { RequestInviteDto } from './dto/request-invite.dto';

@Injectable()
export class InvitesService {
  constructor(private readonly prisma: PrismaService) {}

  async requestInvite(requestInviteDto: RequestInviteDto) {
    const email = requestInviteDto.email.toLowerCase();
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser && existingUser.status !== INVITE_STATUS.REJECTED) {
      throw new ConflictException('An invite already exists for this email.');
    }

    const user = existingUser
      ? await this.prisma.user.update({
          where: { id: existingUser.id },
          data: {
            name: requestInviteDto.name,
            city: requestInviteDto.city,
            status: INVITE_STATUS.PENDING,
            role: USER_ROLES.USER,
          },
        })
      : await this.prisma.user.create({
          data: {
            email,
            name: requestInviteDto.name,
            city: requestInviteDto.city,
            role: USER_ROLES.USER,
            status: INVITE_STATUS.PENDING,
          },
        });

    return {
      message: 'Invite request received.',
      user: sanitizeUser(user),
    };
  }

  async findInviteStatus(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      include: {
        alerts: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!user || user.role !== USER_ROLES.USER) {
      throw new NotFoundException('No invite request was found for this email.');
    }

    const { alerts, ...userRecord } = user;

    return {
      user: sanitizeUser(userRecord),
      alerts: user.status === INVITE_STATUS.APPROVED ? alerts : [],
    };
  }
}
