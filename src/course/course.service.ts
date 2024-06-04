import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Course)
        private courseRepository: Repository<Course>,
    )
    {}
    
    async findOneById(id: string) {
        return await this.courseRepository.findOne({
            where: {
                id: id
            },
            relations: {
                teachers: true
            }
        });
    }
}
