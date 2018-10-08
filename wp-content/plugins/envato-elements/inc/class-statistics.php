<?php
/**
 * Envato Elements:
 *
 * This package handles collecting statistics about users.
 *
 * @package Envato/Envato_Elements
 * @since 0.0.2
 */

namespace Envato_Elements;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}


/**
 * Statistics registration and management.
 *
 * @since 0.0.2
 */
class Statistics extends Base {

	/**
	 * Statistics constructor.
	 */
	public function __construct() {
		parent::__construct();
		add_filter( 'envato_elements_api_body_args', [ $this, 'filter_api_body_args' ] );
	}

	/**
	 * Filter API body arguments.
	 *
	 * @param array $body_args API args.
	 *
	 * @return array
	 */
	public function filter_api_body_args( $body_args ) {

		if ( License::get_instance()->is_activated() ) { // Confirm agreement to T&C
			// Transient stats incase anything we do in here becomes expensive to generate.
			$body_args['statistics'] = get_transient( 'envato_elements_api_statistics' );
			if ( ! $body_args['statistics'] || ! is_array( $body_args['statistics'] ) ) {
				$body_args['statistics']             = [];
				$body_args['statistics']['version']  = ENVATO_ELEMENTS_VER;
				$body_args['statistics']['site_url'] = home_url();
				set_transient( 'envato_elements_api_statistics', $body_args, 60 * 60 );
			}
		}

		return $body_args;
	}


}
