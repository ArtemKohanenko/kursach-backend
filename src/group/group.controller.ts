import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { Roles, RolesGuard } from 'src/user/role.guard';
import { Role } from 'src/user/types/roles';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
    constructor(private courseService: GroupService) {}
    
    @Roles(Role.teacher)
    @UseGuards(RolesGuard)
    @Get('teacher')
    async getMyGroups(@Request() req) {
        const groups = await this.courseService.findGroupsByTeacher(req.user.sub);
        return { data: groups };
    }
}
