import { Injectable } from '@angular/core';
import { Department } from '../department';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, retry } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

@Injectable({
  providedIn: 'root'
})

export class DepartmentService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      console.error(error); 
   
      console.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private readUrl = 'http://i333600.hera.fhict.nl/api/departmentsAPI/department/read.php';
  private updateUrl = 'http://i333600.hera.fhict.nl/api/departmentsAPI/department/update.php';
  private deleteUrl = 'http://i333600.hera.fhict.nl/api/departmentsAPI/department/delete.php';
  private addUrl = 'http://i333600.hera.fhict.nl/api/departmentsAPI/department/create.php';

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.readUrl);
  }
  
  updateDepartments(department: Department): Observable<any>{
    return this.http.post(this.updateUrl, department, httpOptions).pipe(tap(_=>console.log('updated department id=${department.id}')),
    catchError(this.handleError<any>('updateDepartment'))
    );
  }
  
  addDepartments(department: Department): Observable<Department> {
    console.log(department);
    return this.http.post<Department>(this.addUrl, department, httpOptions)
    .pipe(tap((department: Department) => console.log(`added department w/ id=${department.id}`))
    ,catchError(this.handleError<Department>('addDepartments'))
    );
  }

  deleteDepartments(department: Department): Observable<Department>{
    return this.http.post<Department>(this.deleteUrl, department, httpOptions).pipe(
      tap(i=> console.log(`deleted department id=${i}`)),
      catchError(this.handleError<Department>('deleteDepartments'))
    );
  }
   
}
