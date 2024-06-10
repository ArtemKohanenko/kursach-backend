import { Student } from 'src/student/student.entity';
import { Task } from 'src/task/task.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
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
  @JoinColumn({ name: 'taskId' })
  task?: Task;

  @Column({ nullable: true })
  taskId?: string;

  @ManyToOne(() => Student, (course) => course.works)
  @JoinColumn({ name: 'studentId' })
  student?: Student;

  @Column({ nullable: true })
  studentId?: string;

  @Column({default: WorkStatus.unchecked})
  status: WorkStatus;
}
