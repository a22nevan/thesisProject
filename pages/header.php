<!-- Collective header file for all three pages to simplify changes. -->
<div class="pageHeader">
    <div id="h_Anchors">
        <!-- Changes the inactive header anchor depending on the current page. -->
        <?php if ($page == "homePage"): ?>
            <a id="inactive">Home</a>
            <a href="createPost.php">Create Post</a>
            <a href="getPost.php">Get Post</a>
        <?php elseif ($page == "createPost"): ?>
            <a href="homePage.php">Home</a>
            <a id="inactive">Create Post</a>
            <a href="getPost.php">Get Post</a>
        <?php elseif ($page == "getPost"): ?>
            <a href="homePage.php">Home</a>
            <a href="createPost.php">Create Post</a>
            <a id="inactive">Get Post</a>
        <?php endif; ?>
    </div>
</div>