# WEB 2 Project temporary readme
This is a readme file for the teacher taking a look at our work and it will try to describe all the current issues of our project.

The setup we are using is as follows:
* using ng serve to put the web app on localhost:4200
* api is on the hera server at http://www.i333600.hera.fhict.nl/api/(component)/(function).php
	> exact names for component and function can be found here: https://git.fhict.nl/I333600/WEB2-Project/tree/master/src/app/api
* API data is on a hera detabase, which has three tables:
	* task: id, name, budget, duration, deadline, id PK
	* department: id, name, nOfEmployees (number of employees), id PK
	* employee: id, taskid, departmentid, firstName, lastName, id PK, taskid FK on task.id, departmentid FK on department.id

The main issues we face at the moment of writing are:
* CRUD functionality does not fully work with the api we've created

More specifically, our application can fetch data and update it successfully, so read.php and update.php work well, but create.php and delete.php do not work.
