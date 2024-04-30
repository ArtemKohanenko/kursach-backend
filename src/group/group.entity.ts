import { Course } from 'src/course/course.entity';
import { Teacher } from 'src/teacher/teacher.entity';
import { Entity, Column, PrimaryColumn, ManyToMany } from 'typeorm';

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
}
