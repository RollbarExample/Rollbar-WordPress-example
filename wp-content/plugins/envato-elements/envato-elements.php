<?php
/**
 * Plugin Name: Envato Elements - Template Kits (Beta)
 * Description: Beautifully designed, Free templates, Handcrafted for popular WordPress page builders.
 * Author: Envato
 * Author URI: https://envato.com
 * Version: 0.1.0
 * License: GPLv3 or later
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
 *
 * Text Domain: envato-elements
 *
 * @package Envato/Envato_Elements
 *
 * Elements for WordPress is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * Elements for WordPress is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'ENVATO_ELEMENTS_SLUG', 'envato-elements' );
define( 'ENVATO_ELEMENTS_VER', '0.1.0' );
define( 'ENVATO_ELEMENTS_FILE', __FILE__ );
define( 'ENVATO_ELEMENTS_DIR', plugin_dir_path( ENVATO_ELEMENTS_FILE ) );
define( 'ENVATO_ELEMENTS_URI', plugins_url( '/', ENVATO_ELEMENTS_FILE ) );
define( 'ENVATO_ELEMENTS_CONTENT_NAME', 'Template Kit' );
define( 'ENVATO_ELEMENTS_PHP_VERSION', '5.6' );

add_action( 'plugins_loaded', 'envato_elements_load_plugin_textdomain' );

if ( ! version_compare( PHP_VERSION, ENVATO_ELEMENTS_PHP_VERSION, '>=' ) ) {
	add_action( 'admin_notices', 'envato_elements_fail_php_version' );
} elseif ( ! version_compare( get_bloginfo( 'version' ), '4.6', '>=' ) ) {
	add_action( 'admin_notices', 'envato_elements_fail_wp_version' );
} else {
	require ENVATO_ELEMENTS_DIR . 'inc/bootstrap.php';
}


/**
 * Load Envato Elements textdomain.
 *
 * Load gettext translate for Envato Elements text domain.
 *
 * @since 0.0.2
 *
 * @return void
 */
function envato_elements_load_plugin_textdomain() {
	load_plugin_textdomain( 'envato-elements' );
}


/**
 * Envato Elements admin notice for minimum PHP version.
 *
 * Warning when the site doesn't have the minimum required PHP version.
 *
 * @since 0.0.2
 *
 * @return void
 */
function envato_elements_fail_php_version() {
	$message = sprintf(
	/* translators: %s: PHP version */
		esc_html__( 'Envato Elements requires PHP version %s+, plugin is currently NOT ACTIVE. Please contact the hosting provider. WordPress recommends version %s.', 'envato-elements' ),
		ENVATO_ELEMENTS_PHP_VERSION,
		sprintf(
			'<a href="%s" target="_blank">%s</a>',
			esc_url( 'https://wordpress.org/about/requirements/' ),
			esc_html__( '7.2 or above', 'envato-elements' )
		)
	);

	$html_message = sprintf( '<div class="error">%s</div> ', wpautop( $message ) );
	echo wp_kses_post( $html_message );
}

/**
 * Envato Elements admin notice for minimum WordPress version.
 *
 * Warning when the site doesn't have the minimum required WordPress version .
 *
 * @since 0.0.2
 *
 * @return void
 */
function envato_elements_fail_wp_version() {
	/* translators: %s: WordPress version */
	$message      = sprintf( esc_html__( 'Envato Elements requires WordPress version %s+. Because you are using an earlier version, the plugin is currently NOT ACTIVE.', 'envato-elements' ), '4.6' );
	$html_message = sprintf( '<div class="error">%s</div>', wpautop( $message ) );
	echo wp_kses_post( $html_message );
}
