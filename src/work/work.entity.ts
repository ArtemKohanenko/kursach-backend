import { Student } from 'src/student/student.entity';
import { Task } from 'src/task/task.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { WorkStatus } from './type/WorkStatusEnum';

@Entity()
export class Work {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  comment: string;

  @Column()
  data: string;

  @ManyToOne(() => Task, (task) => task.works)
  task?: Task;

  @ManyToOne(() => Student, (course) => course.works)
  student?: Student;

  @Column({default: WorkStatus.unchecked})
  status: WorkStatus;
}
