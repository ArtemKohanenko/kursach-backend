import { Controller, Get, Post, Body, Request, UseGuards, Logger } from '@nestjs/common';
import { SendWorkDto, changeWorkStatusDto } from './dto/work.dto';
import { WorkService } from './work.service';
import { WorkStatus } from './type/WorkStatusEnum';
import { Roles, RolesGuard } from 'src/user/role.guard';
import { Role } from 'src/user/types/roles';

@Controller('work')
export class WorkController {
    constructor(private workService: WorkService) {}

    @Roles(Role.student)
    @UseGuards(RolesGuard)
    @Post()
    async sendMyWork(@Body() sendWorkDto: SendWorkDto, @Request() req) {
        return await this.workService.createWork(sendWorkDto, req.user.sub);
    }

    @Roles(Role.student)
    @UseGuards(RolesGuard)
    @Get()
    async getMyWorks(@Request() req) {
        const works = await this.workService.findWorks(req.user.sub);
        return { data: works }
    }
    
    @Roles(Role.teacher)
    @UseGuards(RolesGuard)
    @Post('changeStatus')
    async changeWorkStatus(@Body() changeWorkStatus: changeWorkStatusDto) {
        return await this.workService.changeStatus(changeWorkStatus);
    }

    @Roles(Role.teacher)
    @UseGuards(RolesGuard)
    @Get('getAllViewingWork')
    async getMyViewingWork(@Request() req) {
        const works = await this.workService.getTeacherViewingWork(req.user.sub);
        return { data: works }
    }
}
