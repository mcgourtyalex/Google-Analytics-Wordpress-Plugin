<?php
    
// Create custom plugin settings menu
add_action('admin_menu', 'create_menu');

// Menu creation callback
function create_menu() {

	//Create new top-level menu
	add_menu_page('Google Analytics Plugin Settings', 'GA Pages Settings', 'administrator', __FILE__, 'ga_settings_page');

	//Call register settings function
	add_action( 'admin_init', 'register_my_settings' );
}

//Register client ID setting
function register_my_settings() {
	register_setting( 'ga_settings_group', 'client_id' );
    register_setting( 'ga_settings_group', 'username' );
    register_setting( 'ga_settings_group', 'password' );
}


// Create settings page
function ga_settings_page() {
?>
<div class="wrap">
<h2>Google Analytics Page List</h2>
    <?php
        $client_id = get_option('client_id');
        if (!$client_id) {
            echo "To set up this application, please create a Client ID with your Google Analytics account.";
        } 
    ?>
<p><strong>To register a new Client ID,</strong><br />(1) Create a new project at the <a href ="https://console.developers.google.com/">Google Developer's Console</a> <br />(2) Visit 'APIs' under 'APIs & Auth' <br />(3) Turn on the Analytics API <br />(4) Visit 'Credentials' under 'APIs & Auth' <br />(5) 'Create new Client ID' <br />(6) Choose Web Application and enter your website's URL or localhost in 'Authorized Javascript Origins'</p>
<form method="post" action="options.php">
    <?php settings_fields( 'ga_settings_group' ); ?>
    <?php do_settings_sections( 'ga_settings_group' ); ?>
    <table class="form-table">
        <tr>
        <th scope="row">Enter New Client ID</th>
        <td><input type="text" name="client_id" value="<?php echo get_option('client_id'); ?>" /></td>
        </tr>
    </table>
    
    <?php submit_button(); ?>
    <br />
    <a target="_blank" href="../wp-content/plugins/credentials/demo/demo.html">?</a>
</form>
</div>
<?php } ?>