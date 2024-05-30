import { Injectable } from '@nestjs/common';
import { SendWorkDto } from './dto/work.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Work } from './work.entity';
import { TaskService } from 'src/task/task.service';
import { StudentService } from 'src/student/student.service';

@Injectable()
export class WorkService {
    constructor(
        @InjectRepository(Work)
        private workRepository: Repository<Work>,
    )
    {}

    async createWork(workDto: SendWorkDto) {
        const work = await this.workRepository.create({...workDto, id: 228});
        await this.workRepository.save(work);

        return { data: work };
    }
}
