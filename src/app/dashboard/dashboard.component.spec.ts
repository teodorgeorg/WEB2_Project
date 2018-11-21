import { Component, OnInit } from '@angular/core';
import { Task } from '../tasks/task';
import { TaskService } from '../task service/task.service';
import { DepartmentService } from '../department service/department.service';
import { Department } from '../department';
import { EmployeeService } from '../employees service/employee.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private taskService: TaskService, private departmentService: DepartmentService, private employeeService: EmployeeService) { }

  tasks: Task[];
  departments: Department[];
  employees: Employee[];
  counter : number;
  selectedTask : Task;
  taskDeptPairs: Array<[number, number]>;
  


  ngOnInit() {
    this.getTasks();
    this.getDepartments();
    this.getEmployees();
    this.taskDeptPairs = [];
  }

  getTasks(): void{
    this.taskService.getTasks()
      .subscribe(tasks => this.tasks = tasks);

}

  getDepartments(): void{
    this.departmentService.getDepartments()
      .subscribe(departments => this.departments = departments);

  }

  getEmployees(): void{
    this.employeeService.getEMPLOYEES()
      .subscribe(employees => this.employees = employees);
  }

  populatePairing(): void{
    if(this.employees){
      for (let x of this.employees){
        if (!this.pairExists(x.taskid, x.departmentid)){
          this.taskDeptPairs.push([x.taskid, x.departmentid]);
        }
      }
    }
  }
  pairExists(a: number, b: number): boolean{
    if (this.taskDeptPairs){
      for (let x of this.taskDeptPairs){
          if (x[0] == a && x[1] == b) {
            return true;
          }
        }
    }
    return false;
  }

  taskHasDepartment(a: number): boolean{
    var found = false;
    for(let i of this.taskDeptPairs){
      if (i[0] == a) {
        found = true;
      }
    }
    return found;
  }

  printPairing(): void{
    for(let i of this.taskDeptPairs){
      console.log(i[0] + " " + i[1]);
    }
  }

  onSelect(task :Task) : void {
    if (this.selectedTask == task) {
      this.selectedTask = null;
    }
    else {
      this.selectedTask = task;
    }
  }

  getDepartmentFromTask(id: number): number{
    for (let i of this.taskDeptPairs){
      if (i[0] == id){
        return i[1];
      }
    }
    return 0;
  }

  getDepartmentNameById(id: number): string {
    for(let i of this.departments){
      if(i.id == id){
        return i.name;
      }
    }
    return null;
  }
  consoleLog(thing): void{
    console.log(thing);
  }
  CountEmployeesOnTask(id:number): number {
    this.counter = 0 ; 
    for (let a of this.employees)
      if(id == a.taskid) {
        this.counter ++;
      }
    if(this.counter){
      return this.counter;
    }
    else{
      return null;
    }
  }

  getEmployeeNames(id: number): string[]{
    let result: string[] = [];
    for (let x of this.employees){
      if (x.taskid == id) {
        let temp = x.firstname + " " + x.lastname;
        result.push(temp);
      }
    }
    return result;
  }

  getNumberOfBusyEmployees(): number{
    let count = 0;
    if(this.employees){
      for (let x of this.employees){
        if (x.taskid) {
          count++;
        }
      }
    }
    return count;
  }
}
