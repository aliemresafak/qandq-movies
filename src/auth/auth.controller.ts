import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SigninDto, SignupDto } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() userDto: SignupDto) {
    return await this.authService.signup(userDto);
  }

  @Post('signin')
  async signin(@Body() userDto: SigninDto) {
    return await this.authService.sigin(userDto);
  }
}
