// backend/src/auth/dto/send-otp.dto.ts

import { IsString } from 'class-validator';

export class SendOtpDto {
  @IsString()
  userId: string;
}
