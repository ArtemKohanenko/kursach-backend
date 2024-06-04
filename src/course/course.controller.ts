import { Controller, Get, UseGuards, Request, Body, Post, Delete } from '@nestjs/common';
import { CourseService } from './course.service';
import { Roles, RolesGuard } from 'src/user/role.guard';
import { Role } from 'src/user/types/roles';
import { CreateCourseDto, DeleteCourseDto } from './dto/course.dto';

@Controller('course')
export class CourseController {
    constructor(private courseService: CourseService) {}

    @Roles(Role.teacher)
    @UseGuards(RolesGuard)
    @Get()
    async getMyCourses(@Request() req) {
        const courses = await this.courseService.getCourses(req.user.sub);
        return { data: courses };
    }

    @Roles(Role.teacher)
    @UseGuards(RolesGuard)
    @Post()
    async createCourse(@Body() createCourseDto: CreateCourseDto, @Request() req) {
        const course = await this.courseService.createCourse(createCourseDto, req.user.sub);
        return { data: course };
    }

    @Roles(Role.teacher)
    @UseGuards(RolesGuard)
    @Delete()
    async deleteCourse(@Body() deleteCourseDto: DeleteCourseDto, @Request() req) {
        const result = await this.courseService.deleteCourse(deleteCourseDto, req.user);
        
        return result;
    }
}
