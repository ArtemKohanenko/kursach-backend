import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';


@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>
    )
    {}

    async findOneById(id: string): Promise<Task | undefined> {
        return await this.taskRepository.findOne({
            where: {
                id: id
            }
        });
    }
}
