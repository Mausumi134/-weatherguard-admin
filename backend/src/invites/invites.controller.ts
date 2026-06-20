import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { InvitesService } from './invites.service';
import { RequestInviteDto } from './dto/request-invite.dto';
import { InviteStatusQueryDto } from './dto/invite-status-query.dto';

@Controller('invites')
export class InvitesController {
  constructor(private readonly invitesService: InvitesService) {}

  @Post('request')
  requestInvite(@Body() requestInviteDto: RequestInviteDto) {
    return this.invitesService.requestInvite(requestInviteDto);
  }

  @Get('status')
  findInviteStatus(@Query() query: InviteStatusQueryDto) {
    return this.invitesService.findInviteStatus(query.email);
  }
}
