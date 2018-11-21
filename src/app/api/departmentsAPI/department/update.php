<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/department.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare department object
$department = new Department($db);
 
// get id of department to be edited
$data = json_decode(file_get_contents("php://input"));

// set ID property of department to be edited
$department->id = $data->id;
 
// set department property values
$department->name = $data->name;
$department->id = $data->id;
$department->nOfEmployees = $data->nOfEmployees;
 
// update the department
if($department->update()){
    echo '{';
        echo '"message": "Department was updated."';
    echo '}';
}
 
// if unable to update the department, tell the user
else{
    echo '{';
        echo '"message": "Unable to update department."';
    echo '}';
}
?>