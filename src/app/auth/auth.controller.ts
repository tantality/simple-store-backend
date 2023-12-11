import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Post,
  Res,
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
    const user =
      await this.authService.findUserByNormalizedEmail(normalizedEmail);

    if (user) {
      throw new BadRequestException(ErrorMessage.UserAlreadyExists);
    }

    const newUser = await this.authService.makeNewUser({
      ...body,
      normalizedEmail,
    });

    if (!newUser) {
      throw new InternalServerErrorException(ErrorMessage.UserCreationFailed);
    }

    const payload = { id: newUser.id, roleId: newUser.roleId };
    const tokens = this.authService.generateTokens(payload);

    await this.authService.setRefreshToken(payload.id, tokens.refreshToken);

    res.cookie(
      CookieName.RefreshToken,
      tokens.refreshToken,
      this.COOKIE_OPTIONS,
    );

    return AuthDto.from({ ...tokens, id: payload.id });
  }

  @Post('/signin')
  @SkipAccessTokenCheck()
  async signin(
    @Body() body: SignInForm,
    @Res({ passthrough: true }) res: Response,
  ) {
    const normalizedEmail = normalize(body.email);
    const user = await this.authService.findUserByNormalizedEmailAndPassword({
      normalizedEmail,
      password: body.password,
    });

    if (!user) {
      throw new NotFoundException(ErrorMessage.UserNotExists);
    }

    const payload = { id: user.id, roleId: user.roleId };
    const tokens = this.authService.generateTokens(payload);

    await this.authService.setRefreshToken(payload.id, tokens.refreshToken);

    res.cookie(
      CookieName.RefreshToken,
      tokens.refreshToken,
      this.COOKIE_OPTIONS,
    );

    return AuthDto.from({ ...tokens, id: payload.id });
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
}
