import { Course } from 'src/course/course.entity';
import { Work } from 'src/work/work.entity';
import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  comment?: string;

  @ManyToOne(() => Course, (course) => course.tasks)
  @JoinColumn({ name: 'courseId' })
  course?: Course;

  @Column({ nullable: true })
  courseId?: string;

  @OneToMany(() => Work, (work) => work.task)
  works: Work[]
}
