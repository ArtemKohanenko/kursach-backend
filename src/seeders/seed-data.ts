import { Course } from 'src/course/course.entity';
import { Group } from 'src/group/group.entity';
import { Student } from 'src/student/student.entity';
import { Task } from 'src/task/task.entity';
import { Teacher } from 'src/teacher/teacher.entity';
import { Work } from 'src/work/work.entity';
import { DataSource, In } from 'typeorm';
import { COURSES_LIST, GROUPS_LIST, STUDENTS_LIST, TASKS_LIST, TEACHERS_LIST } from './data';

export async function seedData(dataSource: DataSource): Promise<void> {

  const courseRepository = dataSource.getRepository(Course);
  const groupRepository = dataSource.getRepository(Group);
  const studentRepository = dataSource.getRepository(Student);
  const taskRepository = dataSource.getRepository(Task);
  const teacherRepository = dataSource.getRepository(Teacher);
  const workRepository = dataSource.getRepository(Work);

  for (const item of COURSES_LIST) {
    let course = courseRepository.create(
        item as unknown as Course,
    );
    await courseRepository.save(course);
  }
  for (const item of GROUPS_LIST) {
    let group = groupRepository.create(
        item as unknown as Group,
    );
    await groupRepository.save(group);
  }
  for (const item of STUDENTS_LIST) {
    let student = studentRepository.create(
        item as unknown as Student,
    );
    await studentRepository.save(student);
  }
  for (const item of TASKS_LIST) {
    let task = taskRepository.create(
        item as unknown as Task,
    );
    await taskRepository.save(task);
  }
  for (const item of TEACHERS_LIST) {
    let teacher = teacherRepository.create(
        item as unknown as Teacher,
    );
    await teacherRepository.save(teacher);
  }
}

