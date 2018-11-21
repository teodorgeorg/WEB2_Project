<?php
class Database{
 
    // credentials for hera database
    private $host = "studmysql01.fhict.local";
    private $db_name = "dbi333600";
    private $username = "dbi333600";
    private $password = "fontys333";
    public $conn;
 
    // get the database connection
    function getConnection(){
        $this->conn = null;
        try{
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
        }
        catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }
 
        return $this->conn;
    }
}
?>