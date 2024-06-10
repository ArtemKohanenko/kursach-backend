import { Group } from 'src/group/group.entity';
import { Task } from 'src/task/task.entity';
import { Teacher } from 'src/teacher/teacher.entity';
import { Entity, Column, PrimaryColumn, ManyToMany, JoinTable, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  subject: string;

  @ManyToMany(
    () => Teacher, 
    teacher => teacher.courses, 
    {onDelete: "CASCADE", onUpdate: 'NO ACTION', cascade: true })
    @JoinTable()
    teachers?: Teacher[];

  @ManyToMany(
    () => Group, 
    group => group.courses, 
    {onDelete: "CASCADE", onUpdate: 'NO ACTION', cascade: true})
    @JoinTable()
    groups?: Group[];

    @OneToMany(() => Task, (task) => task.course, { onDelete: 'SET NULL'} )
    tasks: Task[]
}
