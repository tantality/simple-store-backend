import { IsString, IsUUID } from 'class-validator';

export class AuthDto {
  @IsUUID()
  id: string;

  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;

  static from(dto: AuthDto) {
    if (!dto) {
      return;
    }

    const it = new AuthDto();

    it.id = dto.id;
    it.accessToken = dto.accessToken;
    it.refreshToken = dto.refreshToken;

    return it;
  }
}
