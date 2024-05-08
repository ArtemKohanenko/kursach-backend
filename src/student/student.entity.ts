import { Course } from 'src/course/course.entity';
import { Group } from 'src/group/group.entity';
import { User } from 'src/user/user.entity';
import { Work } from 'src/work/work.entity';
import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';

@Entity()
export class Student {
  @PrimaryColumn()
  id: number;

  @ManyToOne(() => Group, (group) => group.students)
  group?: Group;

  @OneToMany(() => Work, (work) => work.student)
  works: Work[]
}
