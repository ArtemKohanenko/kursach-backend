import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { CreateCourseDto, DeleteCourseDto } from './dto/course.dto';
import { TeacherService } from 'src/teacher/teacher.service';
import { GroupService } from 'src/group/group.service';
import { Role } from 'src/user/types/roles';
import { Task } from 'src/task/task.entity';
import { Teacher } from 'src/teacher/teacher.entity';

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Course)
        private courseRepository: Repository<Course>,
        @InjectRepository(Teacher)
        private teacherRepository: Repository<Teacher>,
        @InjectRepository(Task)
        private taskRepository: Repository<Course>,
        private userService: UserService,
        private teacherService: TeacherService,
        private groupService: GroupService
    )
    {}
    
    async findOneById(id: string) {
        return await this.courseRepository.findOne({
            where: {
                id: id
            }
        });
    }

    async getCourses(teacherUserId: string) {
        const user = await this.userService.findOneById(teacherUserId)
        const teacher = await this.teacherRepository.findOne({
            where: {
                id: user.teacher.id
            },
            relations: {
                courses: {
                    groups: true
                }
            }
        })
        const courses = teacher.courses;
        
        return courses;
    }

    async createCourse(createCourseDto: CreateCourseDto, teacherUserId: string) {
        const user = await this.userService.findOneById(teacherUserId);
        const groupIds = createCourseDto.groupIds;
        delete createCourseDto.groupIds;

        const course = await this.courseRepository.create(createCourseDto);
        const courseRes = await this.courseRepository.save(course);
        
        groupIds.forEach(async groupId => { await this.addGroupToCourse(courseRes.id, groupId) });
        await this.addTeacherToCourse(courseRes.id, user.teacher.id);

        return courseRes;
    }

    async deleteCourse(deleteCourseDto: DeleteCourseDto, userContext) {
        const isAdmin = userContext.roles.split(',').includes(Role.admin)
        const user = await this.userService.findOneById(userContext.sub);
        const teacherId = user.teacher.id;

        const course = await this.courseRepository.findOne({
            where: {
                id: deleteCourseDto.id
            },
            relations: {
                teachers: true
            }
        })

        if (isAdmin || course.teachers.map(teacher => teacher.id).includes(teacherId)) {

            const result = await this.courseRepository.remove(course);

            return result;
        }
        else {
            return HttpStatus.BAD_REQUEST;
        }
    }

    async addTeacherToCourse(courseId: string, teacherId: string) {
        const course = await this.courseRepository.findOne({
            where: {
                id: courseId
            },
            relations: {
                teachers: true
            }
        });
        const teacher = await this.teacherService.findOneById(teacherId);
        
        const newTeachers = [ ...course.teachers, teacher ];
        course.teachers = newTeachers;
        this.courseRepository.save(course);
    }

    async addGroupToCourse(courseId: string, groupId: string) {
        const course = await this.courseRepository.findOne({
            where: {
                id: courseId
            },
            relations: {
                groups: true
            }
        });
        const group = await this.groupService.findOneById(groupId);
        
        const newGroups = [...course.groups, group];
        course.groups = newGroups;
        this.courseRepository.save(course);
    }
}
