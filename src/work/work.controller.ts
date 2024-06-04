import { Controller, Get, Post, Body, Request } from '@nestjs/common';
import { SendWorkDto, changeWorkStatusDto } from './dto/work.dto';
import { WorkService } from './work.service';

@Controller('work')
export class WorkController {
    constructor(private workService: WorkService) {}

    @Post()
    async sendMyWork(@Body() sendWorkDto: SendWorkDto, @Request() req) {
        return await this.workService.createWork(sendWorkDto, req.sub);
    }
    
    @Post('changeStatus')
    async changeWorkStatus(@Body() changeWorkStatus: changeWorkStatusDto) {
        return await this.workService.changeStatus(changeWorkStatus);
    }
}
