<?php

require_once( PATH . '\populate_list.php');
require_once( PATH . '\clientID.php');

// Populate the widget:
function pages_widget_content() {
    
    // Get and make Client ID accessible
    if (handleClientID()) {

        // Insert the iFrame with analytics.html inside
        echo '<iframe id="targetFrame" height="550" src="../wp-content/plugins/google-analytics-page-list/analytics.html" width="100%"></iframe>';
    
        // Populate the Page and Post List
        populateList();
    }
}
?>