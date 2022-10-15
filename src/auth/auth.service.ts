import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { SignupDto, SigninDto } from './dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private configService: ConfigService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(signupData: SignupDto) {
    if (await this.userService.findOneByEmail(signupData.email)) {
      throw new BadRequestException('User already exists');
    }
    this.logger.debug(JSON.stringify(signupData));
    const newUser = await this.userService.create(signupData);
    const accessToken = await this.getTokens(newUser);
    return { accessToken };
  }

  async sigin(singinData: SigninDto) {
    const user = await this.userService.findOneByEmail(singinData.email);
    if (!user) throw new BadRequestException('User does not exist');
    const isCorrectPassword = await user.checkPassword(singinData.password);
    if (!isCorrectPassword)
      throw new BadRequestException('Password is incorrect!');
    const accessToken = await this.getTokens(user);
    return { accessToken };
  }

  async getTokens(user: User) {
    return await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });
  }
}
