export class CreateTaskDto {
    readonly name: string;
    readonly courseId: string;
    readonly comment: string;
}

export class DeleteTaskDto {
    readonly id: string;
}