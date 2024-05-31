import { Injectable } from '@nestjs/common';
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
    )
    {}

    async createWork(workDto: SendWorkDto) {
        const work = await this.workRepository.create({...workDto});
        await this.workRepository.save(work);

        return { data: work };
    }
    async findWorkById(id: number): Promise<Work | undefined> {
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
