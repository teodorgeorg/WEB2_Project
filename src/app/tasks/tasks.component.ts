import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task service/task.service';
import { Task } from '../tasks/task';
import { DepartmentService } from '../department service/department.service';
import { Department } from '../department';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap'
import { formatNumber } from '@angular/common';
import { format } from 'util';

// TODO: see if CRUD works properly after typing in search box
// TODO: default values for input boxes

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
    constructor(private taskService: TaskService, private departmentService: DepartmentService) { }

    tasks: Task[];
    backupTasks: Task[];
    departments: Department[];
    editMode = false;
    selectedTask: Task;
    newDate: NgbDateStruct;
    selectedDate: NgbDateStruct;

    ngOnInit() {
       // this.consoleLog("nginit tasks");
        this.getTasks();
        this.backupTasks = this.tasks;
    }

    selectThis(task: Task): void {
        if (this.selectedTask == task) {
            this.selectedTask = null;
        }
        else {
            this.selectedTask = task;
        }    
    }

    /**
     * Fetches tasks from service and puts them in tasks and backupTasks
     */
    getTasks(): void{
      //  this.consoleLog("subscribed both");
        this.taskService.getTasks()
            .subscribe(tasks => this.tasks = tasks);
        this.taskService.getTasks()
            .subscribe(tasks => this.backupTasks = tasks);
    }

    /**
     * unused?
     */
    getDepartments(): void{
        this.departmentService.getDepartments()
            .subscribe(departments => this.departments = this.departments);
    }

    /**
     * Update all tasks
     */
    updateTasks(): void{
        this.backupTasks = this.tasks;
        this.taskService.updateTask(this.selectedTask).subscribe();
        this.selectedTask = null;
    }

    /**
     * sorting by id to help finding the smallest missing id
     * and making sure the table stays sorted when a new element is added
     * @param a - needed for sort function syntax
     * @param b - needed for sort function syntax
     */
    taskIdSort (a: Task, b: Task): number{
        if (a.id > b.id) {
            return 1
        }
        if (a.id < b.id) {
            return -1;
        }
        return 0;
    }

    /**
     * need to transform all the IDs of the tasks into numbers
     * otherwise the sort function will return 
     * 1,10,11,...,2,20,21... instead of 1,2,...,10,11,...
     */
    numberfyTasks(): void{
        for (let x of this.tasks){
            var y = x.id;
            x.id = null;
            x.id = +y;
        }
    }

    /**
     * finds smallest missing id in the array of tasks
     * 
     * if there are no missing ids return tasks length + 1
     */
    findLatestTaskID(): number{
        this.numberfyTasks();
        this.tasks = this.tasks.sort(this.taskIdSort);
        let currentId = 1;
        for (let index = 0; index < this.tasks.length; index++, currentId++) {
            // this should always return smallest missing id
            if (this.tasks[index].id != currentId) {
                return currentId;
            }
        }
        return this.tasks.length+1;
    }

    //adds a new task to the array of tasks using the parameters provided
    /**
     * Add a new task to the array with the provided parameters
     * @param newName - name of new task, string
     * @param newDuration - duration of new task, number
     * @param newBudget - budget of new task, number
     * @param newDeadline - deadline of new task, NgbDateStruct
     */
    addTask(newName: string, newDuration: number, newBudget: number, newDeadline: NgbDateStruct): void{
        if (newName && newDuration && newBudget){
            // create new Task object
            var newTask = new Task();

            newTask.id = this.findLatestTaskID();
            newTask.name = newName;
            newTask.duration = newDuration;
            newTask.budget = newBudget;
            
            // if new deadline is no null
            // format it so that both day and month have 2 digits
            // to satisfy the database
            if (newDeadline) {
                if (newDeadline.month < 10) {
                    var formattedMonth = newDeadline.month.toString();
                    formattedMonth = "0"+formattedMonth;
                }
                else{
                    formattedMonth = newDeadline.month.toString();
                }
                if (newDeadline.day < 10) {
                    var formattedDay = newDeadline.day.toString();
                    formattedDay = "0"+formattedDay;
                }
                else{
                    formattedDay = newDeadline.day.toString();
                }
                newTask.deadline = `${newDeadline.year.toString()}-${formattedMonth}-${formattedDay}`;
            }
            else{
                newTask.deadline = null;
            }

            // actually add the task
            this.taskService.addTask(newTask)
                .subscribe(newTask => {
                    this.tasks.push(newTask);

                    // also numberfy and sort tasks so it stays ordered
                    this.numberfyTasks();
                    this.tasks = this.tasks.sort(this.taskIdSort);
                });
        }  
    }

    /**
     * Remove provided task from the list
     * @param task - task to remove, Task
     */
    removeTask(task: Task): void {
        // no need to add a call to sort() in .subscribe because
        //  it will still stay sorted when deleting
        this.taskService.deleteTask(task).subscribe();

        // filter current tasks so the table is also updated
        this.tasks = this.tasks.filter(h => h !== task);
      }
    
    // this is needed to make sure backspacing brings back the result you had
    lastSearch = 0;

    /**
     * apply filter to tasks based on provided string
     * 
     * used as a way to search in the tasks when user 
     * types in the search bar
     * @param input - string from the input box, string
     */
    filterTasks(input: string): void{
        // means user has completely deleted search box content
        //
        // backupTasks will always have the values of tasks
        // before anything was typed in the search box
        // ===============
        if (input == "") {
            // if tasks is not already equal to the backup, make it so
            if (this.tasks.length != this.backupTasks.length) {
                this.tasks = this.backupTasks;
                this.lastSearch = 0;
            }
        }
        else {
            // if previous call had a longer string, tasks = backupTasks
            // so no results are omitted
            // then apply the filter again on the full tasks array
            if (this.lastSearch > input.length) {
                if (this.tasks.length != this.backupTasks.length) {
                    this.tasks = this.backupTasks;
                }
            }
            // regexp for the filter function
            var searchInput = new RegExp(input, "gi");
            // the new tasks will be only those entries
            // that pass the regexp
            //
            // this is why we need a backupTasks
            this.tasks = this.tasks.filter(function(element: Task){
                return element.name.search(searchInput) != -1;
            });
            // store the length of the current input to use for next call
            this.lastSearch = input.length;
        }
    }
}
