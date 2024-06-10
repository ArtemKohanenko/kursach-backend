import { Course } from 'src/course/course.entity';
import { Group } from 'src/group/group.entity';
import { User } from 'src/user/user.entity';
import { Work } from 'src/work/work.entity';
import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Group, (group) => group.students)
  @JoinColumn({ name: 'groupId' })
  group?: Group;

  @OneToMany(() => Work, (work) => work.student)
  works: Work[]

  @Column({ nullable: true })
  groupId: string;

  @OneToOne(() => User, user => user.student)
  user?: User;

  @Column({ nullable: true })
  userId?: string;
}
