import { IsIn } from 'class-validator';
import { INVITE_STATUS } from '../../common/constants';

export class UpdateUserStatusDto {
  @IsIn([
    INVITE_STATUS.PENDING,
    INVITE_STATUS.APPROVED,
    INVITE_STATUS.REJECTED,
  ])
  status: string;
}
