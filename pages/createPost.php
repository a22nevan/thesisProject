<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Post</title>
    <link rel="stylesheet" href="style.css">
</head>
<script src="script.js"></script>
<body>
    <?php
        $page = "createPost";
        $index;
        include "header.php";
        include "encryptDecrypt.php";
        include "dbConnect.php";
    ?>

    <div class="pageBody">
        <div class="infoText">
            <!--SHOULD OPEN UP AN INFORMATION WINDOW ON TOP OF THE CURRENT PAGE, CSS + JS MAGIC TO MAKE IT WORK-->
            <header>This is the Create Post page :D</header>
            <p>For further information about page functionality, click <a onclick="showInfo()">here.</a></p>
        </div>

        <div id="darkFilter" onclick="exitInfo()"></div>

        <div id="infoBox">
            Hello
        </div>

        <div id="crP_Interface">

            <div>
                <form method="post">

                    <div id="fileSize">
                        <fieldset>
                            <!--THIS SHOULD DYNAMICALLY UPDATE THE CHARACTER LIMIT-->
                            <!--IDEALLY THE MAXLENGTH OF POSTBODY WOULD BE CHARACTER LIMIT - TITLE CHARACTER COUNT-->
                            <legend>Choose a File Size</legend>

                            <input type="radio" name="fS" id="small" value="s" checked>
                            <label for="small" title="200 - 300 characters">Small</label>

                            <input type="radio" name="fS" id="medium" value="m">
                            <label for="medium" title="1 000 - 1 500 characters">Medium</label>

                            <input type="radio" name="fS" id="large" value="l">
                            <label for="large" title="5 000 - 7 500 characters">Large</label>

                            <input type="radio" name="fS" id="xLarge" value="xl">
                            <label for="xLarge" title="15 000 - 22 500 characters">Extra Large</label>
                        </fieldset>
                    </div>

                    <label for="postTitle" id="ptitleLabel">Title | 0/50 Characters</label>

                    <div>
                        <input type="text" name="title" id="postTitle" maxlength="50">

                        <button id="postButton" name="submitPost" disabled>Submit Post</button>
                    </div>

                    <!--Try to figure out a nice way to implement both the minimum and maximum character limit on the counter-->
                    <label for="postBody" id="pbodyLabel">Content | 0/300 Characters</label>
                    <textarea name="body" id="postBody" rows="20" maxlength="300" minlength="200"></textarea>
                </form>
            </div>

            <!--counter should ideally signal when minimum character length reached as well as maximum, 
            most of this should update dynamically depending on selected file size.-->

            <?php 
                //Checks if the submit button is pushed (checking if file size is set is probably unnecessary since its set to small by default)
                if(isset($_POST['submitPost']) && isset($_POST['fS'])) {

                    $startTime = microtime(true);
                    //Grabs the values from the input fields
                    $fileSize = $_POST['fS'];
                    $title = $_POST['title'];
                    $body = $_POST['body'];
                    //Encrypts the body
                    $encryptionStart = microtime(true);
                    $encrypted = encryptText($body, $method);
                    $encryptionEnd = microtime(true);

                    //Prepares an SQL-query (inserting the post into the database table)
                    $query = "INSERT INTO posts (fileSize, title, content) VALUES ('$fileSize', '$title', '$encrypted')";

                    //Tries the query against the database, exits and reloads if succeeded
                    if ($conn -> query($query) === TRUE) {      

                        $endTime = microtime(true);

                        $encryptionTime = $encryptionEnd - $encryptionStart;
                        $totalTime = $endTime - $startTime;
                        $postLength = strlen($body);

                        //Create a CSV file for the measurements
                      /*  $file = "..\\CSV\\Pilot Study\\create_" . $fileSize . "_" . substr($method, 8) ."_posts.csv";
                        $indexFile = "counter.txt";
                        $fileExists = file_exists($file);

                        $fp = fopen($file, 'a');

                        //Adds headers if file is new
                        if (!$fileExists) {
                            fputcsv($fp, [
                                'Index',
                                'Post Length',
                                'Encryption Start',
                                'Encryption End',
                                'Encryption Delta',
                                'Start Time',
                                'End Time',
                                'Process Delta'
                            ]);
                            $index = 1;
                        } else {
                            $index = (int)file_get_contents($indexFile);
                            $index++;
                        }

                        //Adds the values for this iteration of the process
                        fputcsv($fp, [
                            $index,
                            $postLength,
                            $encryptionStart,
                            $encryptionEnd,
                            $encryptionTime,
                            $startTime,
                            $endTime,
                            $totalTime
                        ]);

                        fclose($fp);

                        file_put_contents($indexFile, $index); */

                        //Reloads the page in a GET-state? A bit unsure exactly how this works couldn't be bothered to take in the information but it prevents resubmission of form on page refresh
                        header("Location: " . $_SERVER['PHP_SELF']);
                        exit();

                    } else {
                        echo "Oops something went wrong lol:" . $conn->error;
                    }
                }
            ?>
        </div>
        <div id="postTest">
            <?php 
                /*if(isset($_POST['submitPost']) && isset($_POST['fS'])) {
                    echo $_POST['title'];
                    echo "<br>";
                    echo $_POST['body'];
                    echo "<br>";
                    echo $_POST['fS'];
                }*/
            ?>
        </div>
    </div>
</body>
</html>