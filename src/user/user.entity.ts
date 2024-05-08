import { Student } from 'src/student/student.entity';
import { Teacher } from 'src/teacher/teacher.entity';
import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @OneToOne(() => Student)
  @JoinColumn()
  student?: Student;

  @OneToOne(() => Teacher)
  @JoinColumn()
  teacher?: Teacher;
}
