import { Department } from './department';


export let DEPARTMENTS: Department[] = [
  { id: 1, nOfEmployees: 2, name: 'Research', listEmployees: [1, 2] },
  { id: 2, nOfEmployees: 0, name: 'Human Resources', listEmployees: null },
  { id: 3, nOfEmployees: 3, name: 'Marketing', listEmployees: [3, 4, 5] },
  { id: 4, nOfEmployees: 0, name: 'IT', listEmployees: null },
  { id: 5, nOfEmployees: 0, name: 'Admission Office', listEmployees: null },
  { id: 6, nOfEmployees: 2, name: 'employeeion', listEmployees: [6, 7] },
  { id: 7, nOfEmployees: 0, name: 'Accounting', listEmployees: null },
  { id: 8, nOfEmployees: 2, name: 'Finance', listEmployees: [8, 9] },
  { id: 9, nOfEmployees: 0, name: 'Purchasing', listEmployees: null },
  { id: 10, nOfEmployees: 0, name: 'Digital Media', listEmployees: null }
];