import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async create(userDto: UserDto) {
    const user = await this.userRepository.create(userDto);
    return await this.userRepository.save(user);
  }
}
