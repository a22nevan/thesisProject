<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home Page</title>
    <link rel="stylesheet" href="style.css">
</head>
<script src="script.js"></script>
<body>
    <?php 
        $page = "homePage"; 
        include "header.php";
    ?>
    <div class="pageBody">

        <div class="infoText">
            <!--SHOULD OPEN UP AN INFORMATION WINDOW ON TOP OF THE CURRENT PAGE, CSS + JS MAGIC TO MAKE IT WORK-->
            <header>Hello, Welcome to the Thesis Project Test Site!</header>
            <p>For information, press <a onclick="showInfo()">here.</a></p>
        </div>

        <div id="darkFilter" onclick="exitInfo()"></div>

        <div id="infoBox">
            Hello
        </div>

        <div id="hP_Interface">
            <h1>Select Page:</h1>
            <div id="line"></div>
            <div id="SP_buttons">
                <a href="createPost.php">Create Post</a>
                <a href="getPost.php">Get Post</a>
            </div>
        </div>

        <div id="encryptionTest">

        </div>
    </div>

</body>
</html>
