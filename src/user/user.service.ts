import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}  
    async findOne(name: string): Promise<User | undefined> {
        return await this.userRepository.findOne({
            where: {
                name
            }
        });
      }
    
}
