import { Course } from 'src/course/course.entity';
import { Student } from 'src/student/student.entity';
import { Entity, Column, PrimaryColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: number;

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
