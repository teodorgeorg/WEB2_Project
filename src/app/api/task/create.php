<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, PUT");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// get database connection
include_once 'database.php';
 
// instantiate task object
include_once 'task.php';
 
$database = new Database();
$db = $database->getConnection();
$task = new task($db);
 
// get POST data
$data = json_decode(file_get_contents("php://input"));

// set task property values
$task->name = $data->name;
$task->id = $data->id;
$task->budget = $data->budget;
// i'm not sure if this check if needed or can be optimized
// but it works
if ($data->deadline !== NULL) {
    $task->deadline = $data->deadline;
}
else{
    $task->deadline = NULL;
}
$task->duration = $data->duration;

// create the task
if($task->create()){
    print_r(json_encode($task));
}
else{
    echo '{';
        echo '"message": "Unable to create task."';
    echo '}';
}
?>