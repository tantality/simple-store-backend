import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CookieOptions, Response } from 'express';
import { AuthDto } from 'domain/dto/auth.dto';
import { ErrorMessage } from 'enums/error-message.enum';
import normalize from 'normalize-email';
import { AuthService } from './auth.service';
import { SignInForm } from './domain/signin.form';
import { SignUpForm } from './domain/signup.form';
import {
  CookieName,
  REFRESH_TOKEN_LIFETIME_IN_MS,
} from 'libs/security/constants/security.constants';
import { CurrentUser } from 'libs/security/decorators/current-user.decorator';
import { UserSessionDto } from 'domain/dto/user-session.dto';
import { SkipAccessTokenCheck } from 'libs/security/decorators/skip-access-token-check.decorator';
import { RefreshTokenGuard } from 'libs/security/guards/refresh-token.guard';

@Controller('auth')
export class AuthController {
  COOKIE_OPTIONS: CookieOptions = {
    maxAge: REFRESH_TOKEN_LIFETIME_IN_MS,
    httpOnly: true,
  };

  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @SkipAccessTokenCheck()
  async signup(
    @Body() body: SignUpForm,
    @Res({ passthrough: true }) res: Response,
  ) {
    const normalizedEmail = normalize(body.email);
    const userEntity =
      await this.authService.findUserByNormalizedEmail(normalizedEmail);

    if (userEntity) {
      throw new InternalServerErrorException(ErrorMessage.UserAlreadyExists);
    }

    const newUserEntity = await this.authService.makeNewUser({
      ...body,
      normalizedEmail,
    });

    if (!newUserEntity) {
      throw new InternalServerErrorException(ErrorMessage.UserCreationFailed);
    }

    const payload = { id: newUserEntity.id, roleId: newUserEntity.roleId };
    const tokens = this.authService.generateTokens(payload);

    await this.authService.setRefreshToken(payload.id, tokens.refreshToken);

    res.cookie(
      CookieName.RefreshToken,
      tokens.refreshToken,
      this.COOKIE_OPTIONS,
    );

    return AuthDto.from({ id: payload.id, ...tokens });
  }

  @Post('/signin')
  @SkipAccessTokenCheck()
  async signin(
    @Body() body: SignInForm,
    @Res({ passthrough: true }) res: Response,
  ) {
    const normalizedEmail = normalize(body.email);
    const userEntity =
      await this.authService.findUserByNormalizedEmailAndPassword({
        normalizedEmail,
        password: body.password,
      });

    if (!userEntity) {
      throw new InternalServerErrorException(ErrorMessage.UserNotExists);
    }

    const payload = { id: userEntity.id, roleId: userEntity.roleId };
    const tokens = this.authService.generateTokens(payload);

    await this.authService.setRefreshToken(payload.id, tokens.refreshToken);

    res.cookie(
      CookieName.RefreshToken,
      tokens.refreshToken,
      this.COOKIE_OPTIONS,
    );

    return AuthDto.from({ id: payload.id, ...tokens });
  }

  @Get('signout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async signout(
    @CurrentUser() user: UserSessionDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.signout(user.id);
    res.clearCookie(CookieName.RefreshToken);
  }

  @Post('refresh-tokens')
  @UseGuards(RefreshTokenGuard)
  @SkipAccessTokenCheck()
  async refreshTokens(
    @CurrentUser() user: UserSessionDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.refreshTokens(user);
    res.cookie(
      CookieName.RefreshToken,
      tokens.refreshToken,
      this.COOKIE_OPTIONS,
    );

    return AuthDto.from({ id: user.id, ...tokens });
  }
}
