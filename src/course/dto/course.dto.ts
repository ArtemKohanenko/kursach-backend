import { Group } from "src/group/group.entity";

export class CreateCourseDto {
    readonly name: string;
    readonly subject: string;
    
    groupIds: string[];
}
