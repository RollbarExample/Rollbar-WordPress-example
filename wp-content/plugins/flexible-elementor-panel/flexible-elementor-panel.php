<?php
/**
Plugin Name: Flexible Elementor Panel
Plugin URI: https://wordpress.org/plugins/flexible-elementor-panel
Description: This is an add-on for popular page builder Elementor. Makes Elementor Widgets Panel flexible, draggable and folding that more space and opportunities.
Version: 1.7.0
Author: Creative Web Solution
Author URI: http://creativewebsolution.pl/
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

define( 'FLEXIBLE_ELEMENTOR_PANEL__FILE__', __FILE__ );

define( 'FEP_URL', plugins_url( '/', __FILE__ ) );
define( 'FEP_PATH', plugin_dir_path( __FILE__ ) );

/**
 * Load Elementor Flexible Panel
 *
 * Load the plugin after Elementor (and other plugins) are loaded.
 *
 * @since 1.0.0
 */
function flexible_elementor_panel_load() {
	// Load localization file
	load_plugin_textdomain( 'flexible-elementor-panel' );

	// Notice if the Elementor is not active
	if ( ! did_action( 'elementor/loaded' ) ) {
		add_action( 'admin_notices', 'flexible_elementor_panel_fail_load' );
		return;
	}

	// Check required version
	$elementor_version_required = '1.4.0';
	if ( ! version_compare( ELEMENTOR_VERSION, $elementor_version_required, '>=' ) ) {
		add_action( 'admin_notices', 'flexible_elementor_panel_fail_load_out_of_date' );
		return;
	}

	// Require the main plugin file
	require( __DIR__ . '/flexible-elementor-panel-main-plugin.php' );
}
add_action( 'plugins_loaded', 'flexible_elementor_panel_load' );


function flexible_elementor_panel_fail_load_out_of_date() {
	if ( ! current_user_can( 'update_plugins' ) ) {
		return;
	}

	$file_path = 'elementor/elementor.php';

	$upgrade_link = wp_nonce_url( self_admin_url( 'update.php?action=upgrade-plugin&plugin=' ) . $file_path, 'upgrade-plugin_' . $file_path );
	$message = '<p>' . __( 'Flexible Elementor Panel is not working because you are using an old version of Elementor.', 'flexible-elementor-panel' ) . '</p>';
	$message .= '<p>' . sprintf( '<a href="%s" class="button-primary">%s</a>', $upgrade_link, __( 'Update Elementor Now', 'flexible-elementor-panel' ) ) . '</p>';

	echo '<div class="error">' . $message . '</div>';
}