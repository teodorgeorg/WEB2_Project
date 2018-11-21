import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DepartmentsComponent } from './departments/departments.component';
import { FormsModule } from '@angular/forms';
import { TasksComponent } from './tasks/tasks.component';
import { EmployeesComponent} from './employees/employees.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClient } from 'selenium-webdriver/http';
import { HttpClientModule }    from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { TaskService} from './task service/task.service';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardTasksComponent } from './dashboard-tasks/dashboard-tasks.component';


@NgModule({
  declarations: [
    AppComponent,
    DepartmentsComponent,
    TasksComponent,
    EmployeesComponent,
    DashboardComponent,
    DashboardTasksComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    HttpClientModule,
    NgbDatepickerModule
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
