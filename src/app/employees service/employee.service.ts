import { Injectable } from '@angular/core';
import { Employee } from '../employee';
import { Observable , of} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError,  tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }
  
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private UlDelete ="http://www.i333600.hera.fhict.nl/api/employee/delete-employee.php";
  private UlRead ="http://www.i333600.hera.fhict.nl/api/employee/read-employee.php";
  private UlAdd ="http://i333600.hera.fhict.nl/api/employee/create.php"
  private UlUpdate ="http://i333600.hera.fhict.nl/api/employee/update.php"
 
  getEMPLOYEES(): Observable<Employee[]> {
  return this.http.get<Employee[]>(this.UlRead);
  }

  DeleteEmp(emp : Employee) : Observable<Employee> {
    return this.http.post<Employee>(this.UlDelete, emp, httpOptions).pipe(
      tap(i=> console.log(`deleted Employeee  id=${emp.id}`)),
      catchError(this.handleError<Employee>('deleteEmployees'))
    );
  }

  addEmployees(employee: Employee): Observable<any> {
    console.log(employee)
    return this.http.post<Employee>(this.UlAdd, employee, httpOptions).pipe(
      tap((employee: Employee) => console.log(`added Employee w/ id=${employee.id}`))
      ,catchError(this.handleError<Employee>('addEmployees'))
    );
    
  }

  updateEmployees(employee: Employee): Observable<any>{
    console.log(employee);
    return this.http.post(this.UlUpdate, employee, httpOptions).pipe(
      tap((_) => console.log(`Update Employee w/ id=${employee.id}`))
      ,catchError(this.handleError<Employee>('UpdateEmployees'))
    );
  }
  /**
   * updateTask(task: Task): Observable<any>{
    return this.http.post(this.updateUrl, task, httpOptions).pipe(
      // confirmation message
      tap(_ => console.log(`updated task id=${task.id}`)),
      catchError(this.handleError<any>('updateTask'))
    );
  }
   */
  
}
