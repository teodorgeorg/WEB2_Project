<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once 'database.php';
include_once 'task.php';
 
// instantiate database and task object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$task = new Task($db);
 
// query tasks
$stmt = $task->read();
$num = $stmt->rowCount();

// check if more than 0 record found
if($num>0){
    // tasks array
    $tasks_arr=array();
 
    // retrieve our table contents
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $task_item=array(
            "id" => $id,
            "name" => $name,
            "duration" => $duration,
            "budget" => $budget,
            "deadline" => $deadline
        );
 
        array_push($tasks_arr, $task_item);
    }
 
    echo json_encode($tasks_arr);
}
// no records found
else{
    echo json_encode(
        array("message" => "No tasks found.")
    );
}
?>