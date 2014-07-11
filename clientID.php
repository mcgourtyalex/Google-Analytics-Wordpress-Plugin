<?php

    // Returns true if an ID is entered, false if not
    function handleClientID () {
        // Get client ID from options, prompt for ID and quit if empty
        $client_id = get_option('client_id');
        if (!$client_id) {
            echo "Please enter a client_id on the GA Pages Settings page.";
            return FALSE;
        }
    
        // Access Client_ID from javascript here
        echo '<div style="display:none;" id="client_id">'.$client_id.'</div>';
        return TRUE;
    }
?>