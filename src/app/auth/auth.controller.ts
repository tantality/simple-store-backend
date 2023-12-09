import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { AuthDto } from 'domain/dto/auth.dto';
import { ErrorMessage } from 'enums/error-message.enum';
import normalizeEmail from 'normalize-email';
import { AuthService } from './auth.service';
import { SignUpForm } from './domain/signup.form';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: SignUpForm) {
    const normalizedEmail = normalizeEmail(body.email);
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

    return AuthDto.from({ ...tokens, id: payload.id });
  }
}
