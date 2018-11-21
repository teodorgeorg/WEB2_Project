<?php
class employee{
 
    // database connection and table name
    private $conn;
    private $table_name = "employee";
 
    // object properties
    public $id;
    public $taskid;
    public $departmentid;
    public $firstname;
    public $lastname;
  
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
    function read(){
 
        // select all query
        $query = "SELECT  id , taskid , departmentid ,firstname , lastname from employee";
        // prepare query statement
        $stmt = $this->conn->prepare($query);
     
        // execute query
        $stmt->execute();
     
        return $stmt;
    }
    
    // delete the employee
    function delete(){
 
    // delete query
    $query = "DELETE FROM employee  WHERE id = ?";
 
    // prepare query
    $stmt = $this->conn->prepare($query);
 
    // sanitize
    $this->id=htmlspecialchars(strip_tags($this->id));
 
    // bind id of record to delete
    $stmt->bindParam(1, $this->id);
 
    // execute query
    if($stmt->execute()){
        return true;
    }
 
    return false;
     
}
//create employee
function create(){
 
    // query to insert record
    $query = "INSERT INTO
                " . $this->table_name . "
            SET
                id=:id, taskid=:taskid, departmentid=:departmentid, firstname=:firstname,lastname=:lastname";
 
    // prepare query
    $stmt = $this->conn->prepare($query);
 
    // sanitize
    $this->id=htmlspecialchars(strip_tags($this->id));
    $this->taskid=htmlspecialchars(strip_tags($this->taskid));
    $this->departmentid=htmlspecialchars(strip_tags($this->departmentid));
    $this->firstname=htmlspecialchars(strip_tags($this->firstname));
    $this->lastname=htmlspecialchars(strip_tags($this->lastname));
 
    // bind values
    $stmt->bindParam(":id", $this->id);
    $stmt->bindParam(":taskid", $this->taskid);
    $stmt->bindParam(":departmentid", $this->departmentid);
    $stmt->bindParam(":firstname", $this->firstname);
    $stmt->bindParam(":lastname", $this->lastname);
 
    // execute query
    if($stmt->execute()){
        return true;
    }
 
    return false;   
 }

 function readOne(){
 
    // query to read single record
    $query = "SELECT
                 id, taskid , departmentid , firstname , lastname
            FROM
                 $this->table_name";
 
    // prepare query statement
    $stmt = $this->conn->prepare( $query );
 
    // bind id of employee to be updated
    $stmt->bindParam(1, $this->id);
 
    // execute query
    $stmt->execute();
 
    // get retrieved row
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
 
    // set values to object properties
    $this->id = $row['id'];
    $this->taskid = $row['taskid'];
    $this->departmentid = $row['departmentid'];
    $this->firstname = $row['firstname'];
    $this->lastname = $row['lastname'];
}

// update the employee
function update(){
 
    // update query
    $query = "UPDATE
                 $this->table_name  
            SET
                taskid = :taskid,
                departmentid = :departmentid,
                firstname = :firstname,
                lastname = :lastname
            WHERE
                id = :id";
 
    // prepare query statement
    $stmt = $this->conn->prepare($query);
 
    // sanitize
    $this->taskid=htmlspecialchars(strip_tags($this->taskid));
    $this->departmentid=htmlspecialchars(strip_tags($this->departmentid));
    $this->firstname=htmlspecialchars(strip_tags($this->firstname));
    $this->lastname=htmlspecialchars(strip_tags($this->lastname));
    $this->id=htmlspecialchars(strip_tags($this->id));
 
    // bind new values
    $stmt->bindParam(':name', $this->taskid);
    $stmt->bindParam(':price', $this->departmentid);
    $stmt->bindParam(':description', $this->firstname);
    $stmt->bindParam(':category_id', $this->lastname);
    $stmt->bindParam(':id', $this->id);
 
    // execute the query
    if($stmt->execute()){
        return true;
    }
 
    return false;
}

}
?>