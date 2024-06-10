import { Group } from "src/group/group.entity";

export class CreateCourseDto {
    readonly name: string;
    readonly subject: string;
    comment?: string;
    groupIds: string[];
}

export class DeleteCourseDto {
    readonly id: string;
}