import { Course } from 'src/course/course.entity';
import { Group } from 'src/group/group.entity';
import { Teacher } from 'src/teacher/teacher.entity';
import { Work } from 'src/work/work.entity';
import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Student {
  @PrimaryColumn()
  studentId: number;

  @Column()
  name: string;

  @ManyToOne(() => Group, (group) => group.students)
  group?: Group;

  @OneToMany(() => Work, (work) => work.student)
  works: Work[]
}
