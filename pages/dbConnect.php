<?php
    $serverName = "localhost";
    $user = "root";
    $password = "";
    $dbName = "thesisproject";
    $port = 3307;

    $conn = new mysqli($serverName, $user, $password, $dbName, $port);

    if ($conn -> connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    else {
        echo "Connection Successful!";
    }
?>