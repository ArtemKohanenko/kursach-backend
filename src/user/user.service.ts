import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}
    
    // async getLoginUser(sub: number) {
    //     const user = await this.userRepository.findOne({
    //         where: {
    //             id: sub
    //         },
    //         relations: ['student', 'teacher']
    //     });

    //     return {
    //         id: user.id,
    //         name: user.name,
    //         studentId: user.student,
    //         teacherId: user.teacher
    //     };
    // }

    async findOneByName(name: string): Promise<User | undefined> {
        return await this.userRepository.findOne({
            where: {
                name
            }
        });
    }

    async findOneById(id: string): Promise<User | undefined> {
        return await this.userRepository.findOne({
            where: {
                id
            },
            relations: ['student', 'teacher']
        });
    }
    
}
