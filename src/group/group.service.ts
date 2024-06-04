import { Injectable } from '@nestjs/common';
import { Group } from './group.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class GroupService {
    constructor(
        @InjectRepository(Group)
        private groupRepository: Repository<Group>
    )
    {}
    
    async findOneById(id: string) {
        return await this.groupRepository.findOne({
            where: {
                id: id
            }
        });
    }
}
