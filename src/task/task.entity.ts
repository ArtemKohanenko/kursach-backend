import { Course } from 'src/course/course.entity';
import { Work } from 'src/work/work.entity';
import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  comment: string;

  @ManyToOne(() => Course, (course) => course.tasks)
  course?: Course;

  @OneToMany(() => Work, (work) => work.task, { onDelete: 'SET NULL'})
  works: Work[]
}
