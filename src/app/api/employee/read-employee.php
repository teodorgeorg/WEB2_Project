<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once 'database.php';
include_once 'employee.php';
 
// instantiate database and employee object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$employee = new employee($db);
 
// query employees
$stmt = $employee->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    // employees array
    $employees_arr=array();
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $employee_item=array(
            "id" => $id,
            "taskid" => $taskid,
            "departmentid" => $departmentid,
            "firstname" => $firstname,
            "lastname" => $lastname
        );
        array_push($employees_arr,$employee_item);
    }
 
    echo json_encode($employees_arr);
}
 
else{
    echo json_encode(
        array("message" => "No employees found.")
    );
}
?>