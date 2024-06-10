import { Course } from 'src/course/course.entity';
import { User } from 'src/user/user.entity';
import { Entity, OneToOne, ManyToMany, PrimaryGeneratedColumn, Column, JoinColumn } from 'typeorm';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(
    () => Course,
    course => course.teachers,
    {onDelete: "CASCADE", onUpdate: 'NO ACTION' },
  )
  courses?: Course[];

  @OneToOne(() => User, user => user.teacher)
  user?: User;

  @Column({ nullable: true })
  userId?: string;
}
