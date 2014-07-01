<?php

function change_column_width() {
?>
<style>
@media only screen and (min-width: 500px) {
	#dashboard-widgets .postbox-container {
		width:550px !important;
	}
    .metabox-holder .postbox-container .empty-container {
        border: none !important;
    }
}
</style>
<?php
}

add_action('admin_head','change_column_width');
?>