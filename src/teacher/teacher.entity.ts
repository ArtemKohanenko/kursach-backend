import { Course } from 'src/course/course.entity';
import { Entity, Column, PrimaryColumn, ManyToMany } from 'typeorm';

@Entity()
export class Teacher {
  @PrimaryColumn()
  teacherId: number;

  @Column()
  name: string;

  @ManyToMany(
    () => Course,
    course => course.teachers,
    {onDelete: 'NO ACTION', onUpdate: 'NO ACTION',},
  )
  courses?: Course[];
}
