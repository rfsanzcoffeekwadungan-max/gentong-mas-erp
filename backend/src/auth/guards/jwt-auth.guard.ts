// backend/src/auth/guards/jwt-auth.guard.ts

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Protects routes by requiring a valid JWT access token
 * in the Authorization: Bearer <token> header.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
