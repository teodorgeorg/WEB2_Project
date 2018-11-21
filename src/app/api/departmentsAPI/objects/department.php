<?php
class Department{
 
    // database connection and table name
    private $conn;
    private $table_name = "department";
 
    // object properties
    public $id;
    public $name;
    public $nOfEmployees;
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    // read departments
    function read(){
 
    // select all query
    $query = "SELECT * FROM department";
                
    // prepare query statement
    $stmt = $this->conn->prepare($query);
 
    // execute query
    $stmt->execute();
 
    return $stmt;
    }

    // create department
    function create(){
 
        // query to insert record
        $query = "INSERT INTO department (id, name, nOfEmployees) VALUES (:id, :name, :nOfEmployees)";
        
        // prepare query
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $this->name=htmlspecialchars(strip_tags($this->name));
        $this->id=htmlspecialchars(strip_tags($this->id));
        $this->nOfEmployees=htmlspecialchars(strip_tags($this->nOfEmployees));
    
        // bind values
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":id", $this->id);
        $stmt->bindParam(":nOfEmployees", $this->nOfEmployees);
    
        // execute query
        if($stmt->execute()){
            return true;
        }
    
        return false;
     
    }

    // update the department
    function update(){

        // update query
        $query = "UPDATE 
                    department
                SET
                    name = :name,
                    id = :id,
                    nOfEmployees = :nOfEmployees
                WHERE
                    id = :id";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->name=htmlspecialchars(strip_tags($this->name));
        $this->id=htmlspecialchars(strip_tags($this->id));
        $this->nOfEmployees=htmlspecialchars(strip_tags($this->nOfEmployees));
    
        // bind new values
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':nOfEmployees', $this->nOfEmployees);
    
        // execute the query
        if($stmt->execute()){
            return true;
        }
    
        return false;
        
    }

    // delete the department
    function delete(){
 
        // delete query
        $query = "DELETE FROM department WHERE id = ?";
    
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
}