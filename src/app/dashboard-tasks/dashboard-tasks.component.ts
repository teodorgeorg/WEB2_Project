import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Task } from '../tasks/task';
import { TaskService } from '../task service/task.service';
import { DepartmentService } from '../department service/department.service';
import { Department } from '../department';
import { EmployeeService } from '../employees service/employee.service';
import { Employee } from '../employee';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-dashboard-tasks',
  templateUrl: './dashboard-tasks.component.html',
  styleUrls: ['./dashboard-tasks.component.css']
})
export class DashboardTasksComponent implements OnInit {

  @Output() taskCreated = new EventEmitter<boolean>();

  constructor(private taskService: TaskService, private departmentService: DepartmentService, private employeeService: EmployeeService , private http : HttpClient) { }

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
    }
  }

  addNewTask(taskId: number, departmentId: number, employeeList: string): void{
    var i = 0;
    var employeeIdStrings: string [];
    var employeeIdNumbers: number[]=[];
    var employeesToUpdate: Employee[]=[];
    employeeIdStrings = employeeList.split(',');
    for (let x of employeeIdStrings){
      employeeIdNumbers.push(parseInt(x));
    }
    employeeIdNumbers.sort();
    for (let x of this.employees){
      if (x.id == employeeIdNumbers[i]) {
        employeesToUpdate.push(x);
        i++;
      }
    }
    for (let x of employeesToUpdate){
      x.departmentid = +departmentId;
      x.taskid = +taskId;
      this.employeeService.updateEmployees(x).subscribe(y => console.log(``)); 
    }
    this.taskCreated.emit(true);
  }
}
