<?php 
    require "dbConnect.php";

    //Checks if a value exists, otherwise sets it to null
    $fileSize = $_GET['fileSize'] ?? null;

    //Database shenanigans if value of fileSize isnt false (in this case not null)
    if($fileSize) {

        $query = $conn -> prepare("SELECT * FROM posts WHERE fileSize = ?");
        $query -> bind_param("s", $fileSize);
        $query -> execute();

        $result = $query -> get_result();

        $posts = [];

        while ($row = $result -> fetch_assoc()) {
            $posts[] = $row;
        }

        //Sends the content as json data
        header("Content-Type: application/json");
        echo json_encode($posts);
    }

?>