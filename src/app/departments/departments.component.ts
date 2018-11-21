import { Component, OnInit } from '@angular/core';
import { Department } from '../department';
import {DepartmentService } from '../department service/department.service';
import { Employee } from '../employee';
import { EmployeeService } from '../employees service/employee.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})

export class DepartmentsComponent implements OnInit 
{ 
  constructor(private departmentService: DepartmentService, private employeeService: EmployeeService) { }
  
  ngOnInit() {
    this.getDepartment();
    this.getEmployee();
    this.backupDepartments = this.departments;
  }
  
  departments : Department[];
  selectedDepartment: Department;
  employees : Employee[];
  backupDepartments : Department[];
  deptEmployeePairs: Array<[number, number]>;

  onSelect(department: Department): void {
    this.selectedDepartment = department;
  }

  getDepartment(): void {
    this.departmentService.getDepartments().subscribe(departments => this.departments = departments);
    this.departmentService.getDepartments().subscribe(departments => this.backupDepartments = departments);
  }

  updateDepartment(): void {
    this.departmentService.updateDepartments(this.selectedDepartment).subscribe(() => this.goBack());
  }

  goBack(): void {}

  addDepartment(name: string, id: number, nOfEmployees: number): void {

    name = name.trim();
    if(!name) { return; }
    var department = new Department();
    department.id = id;
    department.name = name;
    department.nOfEmployees = nOfEmployees;
    this.departmentService.addDepartments(department)
    .subscribe(department => {this.departments.push(department);

    this.numberfyDepartrment();
    this.departments = this.departments.sort(this.departmentIdSort);
    });

    
  }

  deleteDepartment(department: Department): void {
    this.departments= this.departments.filter(d => d !== department);
    this.departmentService.deleteDepartments(department).subscribe();

  }

  getEmployee(): void {
    this.employeeService.getEMPLOYEES().subscribe(employees => this.employees = employees)
  }

  getEmployeeOfDepartment(id: number): string[]{
    let result: string[] = [];
    for (let x of this.employees){
      if (id == x.departmentid) {
        let temp = x.firstname + " " + x.lastname;
        result.push(temp);
      }
    }
    return result;
  }

  populatePairs(): void {
    if(this.employees){
      for(let x of this.employees){
        if(!this.pairExists(x.departmentid, x.id)){
          this.deptEmployeePairs.push([x.departmentid, x.id]);
        }
      }
    }
  }

  pairExists(a: number, b: number): boolean {
    if(this.deptEmployeePairs){
      for(let x of this.deptEmployeePairs){
        if(x[0]==a && x[1]==b){
          return true;
        }
      }
    }

    return false;
  }

  deptHasEmployees(a: number): boolean{
    var found = false;
    for (let x of this.deptEmployeePairs){
      if(x[0]==a){
        found = true;
      }
    }

    return found;
  }


  lastSearch = 0;
    filterDepartments(input: string): void{
        if (input == "") {
            if (this.departments.length != this.backupDepartments.length) {
                this.departments = this.backupDepartments;
                this.lastSearch = 0;
            }
        }
        else {
            if (this.lastSearch > input.length) {
                if (this.departments.length != this.backupDepartments.length) {
                    this.departments = this.backupDepartments;
                }
            }
            var searchInput = new RegExp(input, "gi");
            this.departments = this.departments.filter(function(element: Department){
                return element.name.search(searchInput) != -1;
            });
            this.lastSearch = input.length;
        }
    }

    departmentIdSort (a: Department, b: Department): number{
      if (a.id > b.id) {
          return 1
      }
      if (a.id < b.id) {
          return -1;
      }
      return 0;
  }

  numberfyDepartrment(): void{
    for (let x of this.departments){  
        var y = x.id;
        x.id = null;
        x.id = +y;
    }
  }

}

