// backend/src/auth/dto/select-tenant.dto.ts

import { IsString } from 'class-validator';

export class SelectTenantDto {
  @IsString()
  userId: string;

  @IsString()
  companyId: string;
}
