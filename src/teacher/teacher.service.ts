import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeacherService {
    constructor(
        @InjectRepository(Teacher)
        private teacherRepository: Repository<Teacher>
    )
    {}
    
    async findOneById(id: string) {
        return await this.teacherRepository.findOne({
            where: {
                id: id
            }
        });
    }
}
