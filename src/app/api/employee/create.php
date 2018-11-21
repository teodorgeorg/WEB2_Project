<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, PUT");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// get database connection
include_once 'database.php';
 
// instantiate employee object
include_once 'employee.php';
 
$database = new Database();
$db = $database->getConnection();
 
$employee = new employee($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));

// set employee property values
$employee->id = $data->id;
$employee->taskid = $data->taskid;
$employee->departmentid = $data->departmentid;
$employee->firstname = $data->firstname;
$employee->lastname = $data->lastname;
 
// create the employee
if($employee->create()){
    print_r(json_encode($employee));
}
 
// if unable to create the employee, tell the user
else{
    echo '{';
        echo '"message": "Unable to create employee."';
    echo '}';

}
?>
