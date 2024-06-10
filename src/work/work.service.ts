import { Injectable, Logger } from '@nestjs/common';
import { SendWorkDto, changeWorkStatusDto } from './dto/work.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Work } from './work.entity';
import { TaskService } from 'src/task/task.service';
import { StudentService } from 'src/student/student.service';
import { WorkStatus } from './type/WorkStatusEnum';
import { User } from 'src/user/user.entity';

@Injectable()
export class WorkService {
    constructor(
        @InjectRepository(Work)
        private workRepository: Repository<Work>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private studentService: StudentService,
        private taskService: TaskService,
    )
    {}

    async createWork(workDto: SendWorkDto, studentUserId: string) {
        const user = await this.userRepository.findOne({
            where: {
                id: studentUserId
            },
            relations: {
                student: true
            }
        })
        const work = await this.workRepository.create({...workDto, studentId: user.student.id});
        const workRes = await this.workRepository.save(work);

        return { data: workRes };
    }

    async findWorks(studentUserId: string) {
        const user = await this.userRepository.findOne({
            where: {
                id: studentUserId,
            },
            relations: {
                student: {
                    works: true
                }
            }
        })
        const works = user.student.works;

        return works;
    }

    async findWorkById(id: string): Promise<Work | undefined> {
        return await this.workRepository.findOne({
            where: {
                id: id
            }
        });
    }

    async getTeacherWorks(teacherUserId: string) {
        const tasks = await this.taskService.getTeacherTasksById(teacherUserId);
        const taskIds = tasks.map(task => task.id)

        const works = await this.workRepository.find({
            where: {
                task:{
                    id: In(taskIds)
                }
            },
            relations: {
                student: {
                    user: true
                }
            }
        })

        return works
    }

    async getTeacherViewingWorks(teacherUserId: string) {
        const tasks = await this.taskService.getTeacherTasksById(teacherUserId);
        const taskIds = tasks.map(task => task.id)

        const works = await this.workRepository.find({
            where: {
                status: WorkStatus.viewing,
                task:{
                    id: In(taskIds)
                }
            }
        })

        return works
    }

    async changeStatus(newStatus: changeWorkStatusDto) {        
        const work = await this.workRepository.update({id : newStatus.id}, { status: newStatus.status })        
        //await this.workRepository.save(work);
        return { data: work };
    }
}
