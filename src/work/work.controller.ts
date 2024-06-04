import { Controller, Get, Post, Body, Request } from '@nestjs/common';
import { SendWorkDto, changeWorkStatusDto } from './dto/work.dto';
import { WorkService } from './work.service';
import { WorkStatus } from './type/WorkStatusEnum';

@Controller('work')
export class WorkController {
    constructor(private workService: WorkService) {}

    @Post()
    async sendMyWork(@Body() sendWorkDto: SendWorkDto, @Request() req) {
        return await this.workService.createWork(sendWorkDto, req.user.sub);
    }

    @Get()
    async getMyWorks(@Request() req) {
        const works = await this.workService.findWorks(req.user.sub);
        return { data: works }
    }
    
    @Post('changeStatus')
    async changeWorkStatus(@Body() changeWorkStatus: changeWorkStatusDto) {
        return await this.workService.changeStatus(changeWorkStatus);
    }

    @Get('getAllViewingWork')
    async getMyViewingWork(@Body() status: WorkStatus) {
        return await this.workService.getTeacherViewingWork(status);
    }
}
