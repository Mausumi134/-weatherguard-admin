import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { INVITE_STATUS, USER_ROLES } from '../common/constants';
import { sanitizeUser } from '../common/sanitize-user';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(status?: string) {
    const users = await this.prisma.user.findMany({
      where: {
        role: USER_ROLES.USER,
        ...(status ? { status } : {}),
      },
      orderBy: { createdAt: 'desc' },
    });

    return users.map(sanitizeUser);
  }

  async updateStatus(id: string, status: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user || user.role !== USER_ROLES.USER) {
      throw new NotFoundException('User was not found.');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { status },
    });

    return {
      message:
        status === INVITE_STATUS.APPROVED
          ? 'User approved.'
          : status === INVITE_STATUS.REJECTED
            ? 'User rejected.'
            : 'User status updated.',
      user: sanitizeUser(updatedUser),
    };
  }
}
