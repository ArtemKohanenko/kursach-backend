import { ApiProperty } from "@nestjs/swagger"
import { WorkStatus } from "../type/WorkStatusEnum";

export class SendWorkDto{
    readonly comment: string

    readonly data: string;

    readonly taskId: number
}

export class changeWorkStatusDto{
    readonly status: WorkStatus;
    readonly id: string;
}