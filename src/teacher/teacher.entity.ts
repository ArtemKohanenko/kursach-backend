import { Course } from 'src/course/course.entity';
import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryColumn, ManyToMany, OneToOne } from 'typeorm';

@Entity()
export class Teacher {
  @PrimaryColumn()
  id: number;

  @ManyToMany(
    () => Course,
    course => course.teachers,
    {onDelete: 'NO ACTION', onUpdate: 'NO ACTION',},
  )
  courses?: Course[];
}
