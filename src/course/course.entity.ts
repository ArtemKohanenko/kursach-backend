import { Group } from 'src/group/group.entity';
import { Teacher } from 'src/teacher/teacher.entity';
import { Entity, Column, PrimaryColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Course {
  @PrimaryColumn()
  courseId: number;

  @Column()
  name: string;

  @Column()
  subject: string;

  @ManyToMany(
    () => Teacher, 
    teacher => teacher.courses, 
    {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'})
    @JoinTable({
      name: 'course_teacher',
      joinColumn: {
        name: 'courseId',
        referencedColumnName: 'courseId',
      },
      inverseJoinColumn: {
        name: 'teacherId',
        referencedColumnName: 'teacherId',
      },
    })
    teachers?: Teacher[];

  @ManyToMany(
    () => Group, 
    group => group.courses, 
    {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'})
    @JoinTable({
      name: 'course_group',
      joinColumn: {
        name: 'courseId',
        referencedColumnName: 'courseId',
      },
      inverseJoinColumn: {
        name: 'groupId',
        referencedColumnName: 'groupId',
      },
    })
    groups?: Group[];
}

