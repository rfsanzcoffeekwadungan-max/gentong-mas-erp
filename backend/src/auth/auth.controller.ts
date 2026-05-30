// backend/src/auth/auth.controller.ts

import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  Res,
  UseGuards,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Throttle } from '@nestjs/throttler';
import { Response, Request } from 'express';
import { AuthService, AuthResponse } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { SelectTenantDto } from './dto/select-tenant.dto';
import { SendOtpDto } from './dto/send-otp.dto';
import { User } from '@prisma/client';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

const REFRESH_COOKIE_NAME = 'refreshToken';

// httpOnly cookie options — prevent JS access (XSS protection)
const refreshCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
  path: '/',
};

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * POST /auth/login
   * Rate limited to 5 requests per minute to prevent brute-force.
   * Uses LocalStrategy (passport-local) to validate credentials.
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { ttl: 60_000, limit: 5 } })
  @UseGuards(AuthGuard('local'))
  async login(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() _loginDto: LoginDto, // Validated by ValidationPipe before guard runs
    @Req() req: Request & { user: Omit<User, 'password'> },
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponse> {
    const result = await this.authService.login(req.user);

    // Only set the refresh cookie when we're issuing full tokens
    // (i.e., not when 2FA or tenant selection is still required)
    if (!result.requiresOtp && !result.requiresTenantSelect && result.accessToken) {
      // Refresh token goes in httpOnly cookie — never exposed to JS
      const { refreshToken } = await this.authService.selectTenant(
        req.user.id,
        result.companies?.[0]?.id ?? '',
      );
      res.cookie(REFRESH_COOKIE_NAME, refreshToken, refreshCookieOptions);
    }

    return result;
  }

  /**
   * GET /auth/google
   * Initiates Google OAuth flow — redirects to Google consent screen.
   */
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth(): void {
    // Passport redirects to Google; no body needed
  }

  /**
   * GET /auth/google/callback
   * Google redirects back here after user consents.
   */
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(
    @Req() req: Request & { user: Omit<User, 'password'> },
    @Res() res: Response,
  ): Promise<void> {
    const result = await this.authService.login(req.user);
    const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:3000';

    // Redirect to frontend with access token + flow info in query params
    // (In production, prefer setting a short-lived session cookie instead)
    if (result.requiresTenantSelect) {
      const encoded = encodeURIComponent(JSON.stringify(result.companies));
      res.redirect(
        `${frontendUrl}/select-tenant?userId=${req.user.id}&companies=${encoded}`,
      );
    } else if (result.requiresOtp) {
      res.redirect(`${frontendUrl}/otp?userId=${req.user.id}`);
    } else {
      res.cookie(REFRESH_COOKIE_NAME, result.accessToken, refreshCookieOptions);
      res.redirect(`${frontendUrl}/dashboard?token=${result.accessToken}`);
    }
  }

  /**
   * POST /auth/otp/send
   * Send (or resend) a 6-digit OTP to the user's email.
   */
  @Post('otp/send')
  @HttpCode(HttpStatus.OK)
  async sendOtp(@Body() dto: SendOtpDto): Promise<{ message: string }> {
    return this.authService.sendOtp(dto.userId);
  }

  /**
   * POST /auth/otp/verify
   * Verify the OTP and issue access + refresh tokens.
   */
  @Post('otp/verify')
  @HttpCode(HttpStatus.OK)
  async verifyOtp(
    @Body() dto: VerifyOtpDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ accessToken: string }> {
    const { accessToken, refreshToken } = await this.authService.verifyOtp(
      dto.userId,
      dto.code,
    );

    res.cookie(REFRESH_COOKIE_NAME, refreshToken, refreshCookieOptions);

    return { accessToken };
  }

  /**
   * POST /auth/select-tenant
   * After tenant selection UI, issue scoped access + refresh tokens.
   */
  @Post('select-tenant')
  @HttpCode(HttpStatus.OK)
  async selectTenant(
    @Body() dto: SelectTenantDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ accessToken: string }> {
    const { accessToken, refreshToken } = await this.authService.selectTenant(
      dto.userId,
      dto.companyId,
    );

    res.cookie(REFRESH_COOKIE_NAME, refreshToken, refreshCookieOptions);

    return { accessToken };
  }

  /**
   * POST /auth/refresh
   * Uses the httpOnly refreshToken cookie to issue a new access token.
   */
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ accessToken: string }> {
    const rawToken = (req.cookies as Record<string, string>)[REFRESH_COOKIE_NAME];

    if (!rawToken) {
      throw new UnauthorizedException('No refresh token provided');
    }

    const { accessToken, refreshToken } = await this.authService.refreshToken(rawToken);

    // Rotate: replace old cookie with new refresh token
    res.cookie(REFRESH_COOKIE_NAME, refreshToken, refreshCookieOptions);

    return { accessToken };
  }

  /**
   * POST /auth/logout
   * Clears the refresh token cookie and removes it from the DB.
   */
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string }> {
    const rawToken = (req.cookies as Record<string, string>)[REFRESH_COOKIE_NAME] ?? '';

    const result = await this.authService.logout(rawToken);

    // Clear the cookie on the client
    res.clearCookie(REFRESH_COOKIE_NAME, { path: '/' });

    return result;
  }
}
