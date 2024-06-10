import { Student } from 'src/student/student.entity';
import { Teacher } from 'src/teacher/teacher.entity';
import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './types/roles';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  roles: string;

  @OneToOne(() => Student)
  @JoinColumn({ name: 'studentId' })
  student?: Student;

  @Column({ nullable: true })
  studentId?: string;

  @OneToOne(() => Teacher)
  @JoinColumn({ name: 'teacherId' })
  teacher?: Teacher;

  @Column({ nullable: true })
  teacherId?: string;
}
