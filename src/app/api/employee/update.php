<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include_once 'database.php';
include_once 'employee.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare employee object
$employee = new employee($db);
 
// get id of employee to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of employee to be edited
$employee->id = $data->id;
 
// set employee property values
$employee->taskid = $data->taskid;
$employee->departmentid = $data->departmentid;
$employee->firstname = $data->firstname;
$employee->lastname = $data->lastname;
 
// update the employee
if($employee->update()){
    echo '{';
        echo '"message": "employee was updated."';
    echo '}';
}
 
// if unable to update the employee, tell the user
else{
    echo '{';
        echo '"message": "Unable to update employee."';
    echo '}';
}
?>