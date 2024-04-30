import { Course } from 'src/course/course.entity';
import { Student } from 'src/student/student.entity';
import { Teacher } from 'src/teacher/teacher.entity';
import { Entity, Column, PrimaryColumn, ManyToMany, OneToMany } from 'typeorm';

@Entity()
export class Group {
  @PrimaryColumn()
  groupId: number;

  @Column()
  name: string;

  @ManyToMany(
    () => Course,
    course => course.groups,
    {onDelete: 'NO ACTION', onUpdate: 'NO ACTION',},
  )
  courses?: Course[];

  @OneToMany(() => Student, (student) => student.group)
    students: Student[]
}
