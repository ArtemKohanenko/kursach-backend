import { ApiProperty } from "@nestjs/swagger"

export class SendWorkDto{
    readonly comment: string

    readonly data: string;

    readonly taskId: number

    readonly studentId: number
}