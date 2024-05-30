import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private studentRepository: Repository<Student>
    )
    {}

    async findOneById(id: number): Promise<Student | undefined> {
        return await this.studentRepository.findOne({
            where: {
                id: id
            }
        });
    }
}
