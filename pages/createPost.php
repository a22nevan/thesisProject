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
        include "header.php";
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
            <!--NEED TO IMPLEMENT POSTING FUNCTIONALITY AS WELL AS ENCRYPTION-->
            <!--PRIORITY 1 AFTER FINISHING PAGE + MAIN SCRIPTS IS SETTING UP THE DATABASE-->
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

            <div>
                <form>
                    <label for="postTitle" id="ptitleLabel">Title | 0/50 Characters</label>

                    <div>
                        <input type="text" name="title" id="postTitle" maxlength="50">

                        <button id="postButton">Submit Post</button>
                    </div>

                    <!--Try to figure out a nice way to implement both the minimum and maximum character limit on the counter-->
                    <label for="postBody" id="pbodyLabel">Content | 0/300 Characters</label>
                    <textarea name="body" id="postBody" rows="20" maxlength="300" minlength="200"></textarea>
                </form>
            </div>

            <!--counter should ideally signal when minimum character length reached as well as maximum, 
            most of this should update dynamically depending on selected file size.-->
        </div>
    </div>
</body>
</html>