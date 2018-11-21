import { Injectable } from '@angular/core';
import { Task } from '../tasks/task';
import { Observable, of} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError,  tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  constructor(private http: HttpClient) { }

  // URLs for each API function
  private readUrl = "http://www.i333600.hera.fhict.nl/api/task/read.php";
  private addUrl = "http://www.i333600.hera.fhict.nl/api/task/create.php";
  private updateUrl = "http://www.i333600.hera.fhict.nl/api/task/update.php"
  private deleteUrl = "http://www.i333600.hera.fhict.nl/api/task/delete.php";

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
    
      console.error(error); // log to console instead
    
      console.log(`${operation} failed: ${error.message}`);
    
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  /**
   * Retrieves all tasks in the database
   */
  getTasks(): Observable<Task[]>{
    return this.http.get<Task[]>(this.readUrl).pipe(
      // confirmation message on successful fetch
      tap(tasks => console.log('fetched tasks from service')),
      catchError(this.handleError('getTasks', [])));
  }

  /**
   * Adds specified task to database
   * @param task - Task variable to add to the database
   */
  addTask (task: Task): Observable<Task> {
    return this.http.post<Task>(this.addUrl, task, httpOptions).pipe(
      // confirmation message
      tap((t1: Task) => console.log(`added task w/ id=${t1.id}`)),
      catchError(this.handleError<Task>('addtask'))
    );
  }

  updateTask(task: Task): Observable<any>{
    return this.http.post(this.updateUrl, task, httpOptions).pipe(
      // confirmation message
      tap(_ => console.log(`updated task id=${task.id}`)),
      catchError(this.handleError<any>('updateTask'))
    );
  }

  /** DELETE: delete the task from the server */
  deleteTask (task: Task): Observable<any> {
    return this.http.post<Task>(this.deleteUrl, task, httpOptions).pipe(
      // confirmation message
      tap(x => console.log(`deleted task id=${x}`)),
      catchError(this.handleError<Task>('deletetask'))
    );
  }
}