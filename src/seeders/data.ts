import { v4 as uuidv4 } from 'uuid';

const student_id1 = uuidv4()
const student_id2 = uuidv4()
const teacher_id1 = uuidv4()

export const COURSES_LIST = [
    {
        name: 'Лабы',
        subject: 'ООАиП'
    },
    {
        name: 'Дополнительные работы',
        subject: 'ООАиП'
    },
    {
        name: 'Лабы',
        subject: 'Теория чисел'
    }
]

export const GROUPS_LIST = [
    {
        name: 'ФИТ-211'
    },
    {
        name: 'ФИТ-212'
    }
]

export const USERS_LIST = [
    {
        name: 'Виктор Власов',
        password: 123,
    },
    {
        name: 'Фашист',
        password: 123,
    }
]

export const STUDENTS_LIST = [
    {
    },
    {
    }
]

export const TASKS_LIST = [
    {
        name: 'Жим 100кг от груди'
    },
    {
        name: 'К 15 мая сделать ООАиП'
    }
]

export const TEACHERS_LIST = [
    {
    },
    {
    }
]

export const WORKS_LIST = [
    {
        comment: 'Не судите строго',
        data: 'https://ibb.co/3h8kLvf'
    },
    {
        comment: 'Судите строго',
        data: 'https://ibb.co/Q8cLTmm'
    },
    {
        comment: '',
        data: 'https://ibb.co/zZjQz43'
    }
]
