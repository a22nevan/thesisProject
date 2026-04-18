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
        $method = "aes-256-cbc";
        include "header.php";
        include "encryptDecrypt.php";
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
            <div id="enInput">
                <form method="post">
                    <input type="text" name="enTextInput" id="enTextInput">
                    <input type="submit" value="Submit" name="encryptText">
                </form>
            </div>
            
            <div id="enOutput">
                <?php 
                    $cipherText = "";

                    if(isset($_POST['encryptText'])) {
                        $text = $_POST['enTextInput'];
                        $cipherText = encryptText($text, $method);

                        echo "<p>" . $cipherText . "</p>";
                    }
                ?>
            </div>

            <div id="decInput">
                <?php if ($cipherText): ?>
                    <form method="post">
                        <input type="hidden" name="ciphText" value="<?= $cipherText ?>">
                        <input type="submit" name="decryptText">
                    </form>
                <?php endif; ?>
            </div>

            <div id="decOutput">
                <?php 
                    if(isset($_POST['decryptText']) && !empty($_POST['ciphText'])) {
                        var_dump($_POST['ciphText']);
                        $decrypted = decryptText($_POST['ciphText'], $method);

                        var_dump($decrypted);

                        echo "<p>" . $decrypted . "</p>";
                    }
                ?>
            </div>
        </div>
    </div>

</body>
</html>
