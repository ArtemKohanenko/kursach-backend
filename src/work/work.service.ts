import { Injectable, Logger } from '@nestjs/common';
import { SendWorkDto, changeWorkStatusDto } from './dto/work.dto';
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
        private studentService: StudentService,
    )
    {}

    async createWork(workDto: SendWorkDto, studentId: string) {
        const student = await this.studentService.findOneById(studentId)
        const work = await this.workRepository.create({...workDto, student: student});
        await this.workRepository.save(work);

        return { data: work };
    }

    async findWorks(id: string) {
        const student = await this.studentService.findOneById(id);
        return student.works;
    }

    async findWorkById(id: string): Promise<Work | undefined> {
        return await this.workRepository.findOne({
            where: {
                id: id
            }
        });
    }

    async changeStatus(newStatus: changeWorkStatusDto) {        
        const work = await this.workRepository.update({id : newStatus.id}, { status: newStatus.status })        
        //await this.workRepository.save(work);
        return { data: work };
    }
}
