import { Injectable, Logger } from '@nestjs/common';
import { SendWorkDto, changeWorkStatusDto } from './dto/work.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Work } from './work.entity';
import { TaskService } from 'src/task/task.service';
import { StudentService } from 'src/student/student.service';
import { WorkStatus } from './type/WorkStatusEnum';
import { UserService } from 'src/user/user.service';

@Injectable()
export class WorkService {
    constructor(
        @InjectRepository(Work)
        private workRepository: Repository<Work>,
        private studentService: StudentService,
        private taskService: TaskService,
        private userService: UserService,
    )
    {}

    async createWork(workDto: SendWorkDto, studentUserId: string) {
        const user = await this.userService.findOneById(studentUserId);
        const student = await this.studentService.findOneById(user.student.id);
        const task = await this.taskService.findOneById(workDto.taskId);
        const work = await this.workRepository.create({...workDto, student: student, task: task});
        await this.workRepository.save(work);

        return { data: work };
    }

    async findWorks(id: string) {
        const user = await this.userService.findOneById(id);
        const student = await this.studentService.findOneById(user.student.id);
        const works = this.workRepository.find({
            where: {
                student
            },
            relations: {
                task: {
                    course: {
                        teachers: {
                            user: true
                        }
                    }
                }
            }
        })
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
