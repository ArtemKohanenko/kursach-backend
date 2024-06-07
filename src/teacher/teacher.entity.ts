import { Course } from 'src/course/course.entity';
import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryColumn, ManyToMany, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, user => user.teacher)
  user: User;

  @ManyToMany(
    () => Course,
    course => course.teachers,
    {onDelete: "CASCADE", onUpdate: 'NO ACTION' },
  )
  courses?: Course[];
}
