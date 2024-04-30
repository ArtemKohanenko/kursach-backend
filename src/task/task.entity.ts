import { Course } from 'src/course/course.entity';
import { Teacher } from 'src/teacher/teacher.entity';
import { Work } from 'src/work/work.entity';
import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Task {
  @PrimaryColumn()
  taskId: number;

  @Column()
  name: string;

  @ManyToOne(() => Course, (course) => course.tasks)
  course?: Course;

  @OneToMany(() => Work, (work) => work.task)
  works: Work[]
}
