import { Course } from 'src/course/course.entity';
import { Work } from 'src/work/work.entity';
import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Task {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Course, (course) => course.tasks)
  course?: Course;

  @OneToMany(() => Work, (work) => work.task)
  works: Work[]
}
