import { ApiProperty } from "@nestjs/swagger"
import { WorkStatus } from "../type/WorkStatusEnum";

export class SendWorkDto{
    readonly comment: string;
    readonly data: string;
    readonly taskId: string;
}

// export class GetWorksDto{        пока не используется
//     readonly subject?: string;
//     readonly status?: WorkStatus;
//     readonly teacherId?: number;
// }

export class changeWorkStatusDto{
    readonly status: WorkStatus;
    readonly id: string;
}