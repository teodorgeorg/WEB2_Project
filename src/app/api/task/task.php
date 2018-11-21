<?php
class Task{
 
    // database connection and table name
    private $conn;
 
    // object properties
    public $id;
    public $name;
    public $duration;
    public $budget;
    public $deadline;
 
    // constructor with $db as database connection
    function __construct($db){
        $this->conn = $db;
    }

    // read tasks
    function read(){
        $query = "SELECT * FROM task";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // create task
    function create(){
        // if deadline is not null, add it to the query
        // else forget it exists
        if ($this->deadline) {
            $query = "INSERT INTO task (name, id, budget, duration, deadline) 
                                VALUES (:name, :id, :budget, :duration, :deadline)";
            $stmt = $this->conn->prepare($query);
        
            // sanitize
            $this->name=htmlspecialchars(strip_tags($this->name));
            $this->id=htmlspecialchars(strip_tags($this->id));
            $this->budget=htmlspecialchars(strip_tags($this->budget));
            $this->duration=htmlspecialchars(strip_tags($this->duration));
            $this->deadline=htmlspecialchars(strip_tags($this->deadline));
        
            // bind values
            $stmt->bindParam(":name", $this->name);
            $stmt->bindParam(":id", $this->id);
            $stmt->bindParam(":budget", $this->budget);
            $stmt->bindParam(":duration", $this->duration);
            $stmt->bindParam(":deadline", $this->deadline);
            
        }
        else{
            $query = "INSERT INTO task (name, id, budget, duration) 
                                VALUES (:name, :id, :budget, :duration)";
            $stmt = $this->conn->prepare($query);
        
            // sanitize
            $this->name=htmlspecialchars(strip_tags($this->name));
            $this->id=htmlspecialchars(strip_tags($this->id));
            $this->budget=htmlspecialchars(strip_tags($this->budget));
            $this->duration=htmlspecialchars(strip_tags($this->duration));
        
            // bind values
            $stmt->bindParam(":name", $this->name);
            $stmt->bindParam(":id", $this->id);
            $stmt->bindParam(":budget", $this->budget);
            $stmt->bindParam(":duration", $this->duration);
        }

        if($stmt->execute()){
            //successfully added
            return true;
        }
        //couldn't add it
        return false;
        
    }

    // update the task
    function update(){
        $query = "UPDATE task SET name = :name, budget = :budget, deadline = :deadline, duration = :duration
                WHERE id = :id";
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $this->name=htmlspecialchars(strip_tags($this->name));
        $this->price=htmlspecialchars(strip_tags($this->budget));
        $this->description=htmlspecialchars(strip_tags($this->deadline));
        $this->category_id=htmlspecialchars(strip_tags($this->duration));
        $this->id=htmlspecialchars(strip_tags($this->id));
    
        // bind new values
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':budget', $this->budget);
        $stmt->bindParam(':deadline', $this->deadline);
        $stmt->bindParam(':duration', $this->duration);
        $stmt->bindParam(':id', $this->id);
    
        // execute the query
        if($stmt->execute()){
            return true;
        }
        return false;
    }

    // delete the task
    function delete(){
        $query = "DELETE FROM task WHERE id = :id";
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $this->id=htmlspecialchars(strip_tags($this->id));
    
        // bind id of record to delete
        $stmt->bindParam(":id", $this->id);
    
        if($stmt->execute()){
            return true;
        }
        return false;  
    }
}
?>