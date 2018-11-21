import { Task } from './tasks/task';
import { Employee } from './employee';
import { Department } from './department';

export let TASKS: Task[] = [
    { id: 1, name: 'Financial report', duration: 3.5, budget: 0, deadline: 'Monthly'},
    { id: 2, name: 'Budget analysis', duration: 1.25, budget: 0, deadline: 'Yearly' },
    { id: 3, name: 'New project research', duration: 2, budget: 10000, deadline: '12-Oct-2018' },
    { id: 4, name: 'Software design', duration: 1, budget: 20000, deadline: '-' },
    { id: 5, name: 'Software development', duration: 10, budget: 85000, deadline: '10-Dec-2018' },
    { id: 6, name: 'Software testing', duration: 2, budget: 40000, deadline: '10-Dec-2018' },
    { id: 7, name: 'Recruitment proces', duration: 3, budget: 6000, deadline: '-' },
    { id: 8, name: 'Hardware acquisition', duration: 1, budget: 10000, deadline: '-'},
    { id: 9, name: 'Advertising campaign', duration: 52, budget: 100000, deadline: '-'},
    { id: 10, name: 'R&D', duration: 20, budget: 42500, deadline: '-'}
];

/*
import { Task } from './tasks/task';
import { Employee } from './employee';
import { Department } from './department';

export let TASKS: Task[] = [
    { id: 1, name: 'Financial report', duration: 3.5, budget: 0, workers: [8, 9], departments: 8, deadline: 'Monthly'},
    { id: 2, name: 'Budget analysis', duration: 1.25, budget: 0, workers: null, departments: null, deadline: 'Yearly' },
    { id: 3, name: 'New project research', duration: 2, budget: 10000, workers: [1, 2], departments: 1, deadline: '12-Oct-2018' },
    { id: 4, name: 'Software design', duration: 1, budget: 20000, workers: null, departments: null, deadline: '-' },
    { id: 5, name: 'Software development', duration: 10, budget: 85000, workers: [6], departments: 6, deadline: '10-Dec-2018' },
    { id: 6, name: 'Software testing', duration: 2, budget: 40000, workers: [7], departments: 6, deadline: '10-Dec-2018' },
    { id: 7, name: 'Recruitment proces', duration: 3, budget: 6000, workers: null, departments: null, deadline: '-' },
    { id: 8, name: 'Hardware acquisition', duration: 1, budget: 10000, workers: null, departments: null, deadline: '-'},
    { id: 9, name: 'Advertising campaign', duration: 52, budget: 100000, workers: [3, 4, 5], departments: 3, deadline: '-'},
    { id: 10, name: 'R&D', duration: 20, budget: 42500, workers: null, departments: null, deadline: '-'}
];
*/