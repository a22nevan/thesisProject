<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Get Post</title>
    <link rel="stylesheet" href="style.css">
</head>
<script src="script.js"></script>
<body>
    <?php 
        $page = "getPost";
        include "header.php";
        include "encryptDecrypt.php";
        include "dbConnect.php";
    ?>
    
    <div class="pageBody">
        <div class="infoText">
            <!--SHOULD OPEN UP AN INFORMATION WINDOW ON TOP OF THE CURRENT PAGE, CSS + JS MAGIC TO MAKE IT WORK-->
            <header>This is the Get Post page!</header>
            <p>For information about page functionality, click <a onclick="showInfo()">here.</a></p>
        </div>

        <div id="darkFilter" onclick="exitInfo()"></div>

        <div id="infoBox">
            Hello
        </div>

        <div id="postList">
            <form method="post">
                <fieldset>
                    <legend>Select a Post</legend>

                    <div id="dropdownSize">
                        <!--Selecting an option here should update the index-dropdown-->
                        <label for="listSize">Post Size:</label>
                        <select name="size" id="listSize">
                            <option value="s">Small</option>
                            <option value="m">Medium</option>
                            <option value="l">Large</option>
                            <option value="xl">Extra Large</option>
                        </select>
                    </div>

                    <div id="dropdownIndex">
                        <!--Values in this list should update dynamically depending on amount of posts within the file size class-->
                        <label for="listIndex">Post Index:</label>
                        <select name="index" id="listIndex">
                        </select>
                    </div>

                    <button type="submit" name="getPost" id="rButton">Retrieve Post</button>
                </fieldset>
            </form>
        </div>

        <?php 
            if (isset($_POST['getPost'])) {
                $index = $_POST['index'];
                $query = "SELECT * FROM `posts` WHERE `index` = $index";

                $result = $conn -> query($query);

                if ($result && $row = $result -> fetch_assoc()) {
                    $title = $row['title'];
                    $content = $row['content'];

                    $decryptedContent = decryptText($content, $method);
                } else {
                    echo "Oops something went wrong";
                }
            }
        ?>

        <!--SHOULD NOT BE DISPLAYED UNTIL A POST HAS BEEN RETRIEVED, THIS IS JUST A TEMP. PROTOTYPE TO VISUALIZE HOW IT WILL LOOK-->
        <?php if(isset($_POST['getPost'])): ?>
            <div id="postBox">
                <div id="postDisplay">
                    <?php if($title): ?>
                    <div id="postHeader">
                        <header><?php echo $title; ?></header>
                        <div id="line"></div>
                    </div>
                    <?php endif; ?>
                    
                    <p><?php echo nl2br($decryptedContent); ?></p>
                </div>
            </div>
        <?php endif; ?>
    </div>
</body>
</html>