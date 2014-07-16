<?php
/**
 * Plugin Name: Google Analytics Page List
 * Plugin URI: 
 * Description: Lists ALL your website's pages and the number of views received
 * Version: 1.0
 * Author: Alex McGourty
 * Author URI: 
 * License: GLP2
 */

 /*  Copyright 2014  Alex McGourty  (email : mcgourty.alex@gmail.com)

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License, version 2, as 
    published by the Free Software Foundation.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

define( 'PATH', plugin_dir_path( __FILE__ ) );

// Settings for adding Client_ID
require_once( PATH . 'options.php' );

// Widget functions page
require_once( PATH . 'custom_widgets.php' );
require_once( PATH . 'column_width.php' );

// Main dashboard class
class dashboard_widget {
    
    // Constructor adds the action
    function __construct() {
        add_action( 'wp_dashboard_setup', array( $this, 'add_pages_widget' ) );
        add_action('admin_head','cw_change_dashboard_column_width');
    }

    // Callback function to add widget to dashboard
    function add_pages_widget() {
        wp_add_dashboard_widget(
                'google-analytics-page-list',
                'Google Analytics Pages',
                'pages_widget_content');
    }

}
 
// Create the class
$dash = new dashboard_widget();
?>