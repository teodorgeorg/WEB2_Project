
import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import {EMPLOYEESLIST} from '../mock-employees';
import { CommonModule } from "@angular/common";
import { EmployeeService } from '../employees service/employee.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css' ,]
})
export class EmployeesComponent implements OnInit {
 
 
   employees : Employee[];
  selectedEmployee : Employee ;
 emp : Employee  = { firstname:'' , lastname:'' , id: 0 , departmentid : 0 , taskid: 0 };
 Itemcount: number; 
 index : number;
 backupemployees : Employee[];

  constructor(private employeeService : EmployeeService ,  private http : HttpClient ) { }

   
  


  ngOnInit() { 
 this.getEmployees();
 this.backupemployees   = this.employees;
}

 
  onSelect(employee :Employee) : void {
    this.selectedEmployee = employee ;
  }

  getEmployees() : void {
    this.employeeService.getEMPLOYEES().subscribe(employees => this.employees = employees)
    this.employeeService.getEMPLOYEES().subscribe(employees => this.backupemployees = employees);
  }

delete(emp: Employee) : void {    
this.employees = this.employees.filter(e => e !== emp);
this.employeeService.DeleteEmp(emp).subscribe();

}

updateEmployee(): void{
    console.log(typeof this.selectedEmployee.id);
    console.log(typeof this.selectedEmployee.departmentid);
    console.log(typeof this.selectedEmployee.taskid);


    this.employeeService.updateEmployees(this.selectedEmployee)
        .subscribe(); 
          // this.backupemployees = this.employees;
}


lastSearch = 0;
filteremployees(input: string): void{
  console.log(`backup len:\nemployee len: ${this.employees.length}`);
  if (input == "") {
      if (this.employees.length != this.backupemployees.length) {
          this.employees = this.backupemployees;
          this.lastSearch = 0;
      }
  }
  else {
      //if previous call had a longer string, employees = backupemployees
      //so no results are omitted
      if (this.lastSearch > input.length) {
          if (this.employees.length != this.backupemployees.length) {
              this.employees = this.backupemployees;
          }
      }
      var searchInput = new RegExp(input, "gi");
      //console.log("else");
      this.employees = this.employees.filter(function(Element:Employee){
          //console.log("name: " + element.name + "   input: " + searchInput + "    search: " + element.name.search(searchInput));
          return Element.firstname.search(searchInput) != -1;
      });
      this.lastSearch = input.length;
  }
}


addEmployee(Id:number,firstName: string, lastName: string,Departmendid: number , newtaskid:number): void{
        
   
       var  newEmployee = new Employee();
        newEmployee.id = Id;
        newEmployee.firstname = firstName;
        newEmployee.lastname = lastName;
        newEmployee.departmentid = Departmendid;
        newEmployee.taskid = newtaskid;
        console.log(`${newEmployee.id} + ${newEmployee.firstname} +  ${newEmployee.lastname}`); 
        this.employeeService.addEmployees(newEmployee)
        .subscribe(newEmployee => {this.employees.push(newEmployee);});
         //something wrong here        
            
    }
    
    // updateEmployee(Employee: Employee, newId: number, newFirstname: string, newDepartmentid: number, newLastname: string): void{
    //     if (Employee == this.selectedEmployee) {
            
    //         Employee.firstname= newFirstname;
    //         Employee.id = newId;
    //         Employee.lastname = newLastname;
    //         Employee.departmentid  = newDepartmentid;      
    //      console.log("updated");
    //     }
    // }

}
