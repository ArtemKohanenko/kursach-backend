import { Controller, Get, Post, Body } from '@nestjs/common';
import { SendWorkDto } from './dto/work.dto';
import { WorkService } from './work.service';

@Controller('work')
export class WorkController {
    constructor(private workService: WorkService) {}

    @Post()
    async sendWork(@Body() sendWorkDto: SendWorkDto) {
        return await this.workService.createWork(sendWorkDto);
    }
}
