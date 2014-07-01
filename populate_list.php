<?php
    
    // Populate the page/post list
    function populateList() {
        // Header
        echo "Select a page:<br />";
        // (1) Start selector
        echo '<select id="pageSelector">';
        // (2) Add page options
        pagesOptgroup();
        // (3) Add post options
        postsOptgroup();
        // (4) Add category options
        categoriesOptgroup();
        // (5) End selector
        echo '</select><br /><br />';
    }    

    // (2) Get pages and list them as options
    function pagesOptgroup() {
        // Get all pages (Sorted by latest)
        $pages = get_pages();
        echo '<optgroup label="Pages">';
        // Get each page title
        foreach ( $pages as $page ) {
            // Echo title to widget
	        echo "<option>".$page->post_title." | ".get_bloginfo('name')."</option>";
        }
        echo '</optgroup>';
    }

    // (3) Get posts and list them as options
    function postsOptgroup() {
        // Get all posts (sorted by latest)
        $posts = get_posts();
        echo '<optgroup label="Posts">';
        // Get each post title
        foreach ( $posts as $post ) {
            // Echo title to widget
	        echo "<option>".$post->post_title." | ".get_bloginfo('name')."</option>";
        }
        echo '</optgroup>';
    }

    // (4) Get categories and list them as options
    function categoriesOptgroup() {
        // Get all posts (sorted by latest)
        $cats = get_categories();
        echo '<optgroup label="Categories">';
        // Get each post title
        foreach ( $cats as $cat ) {
            // Echo title to widget
	        echo "<option>".$cat->name." | ".get_bloginfo('name')."</option>";
        }
        echo '</optgroup>';
    }

?>