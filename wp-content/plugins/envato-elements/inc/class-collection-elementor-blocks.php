<?php
/**
 * Envato Elements: Elementor
 *
 * Elementor template display/import.
 *
 * @package Envato/Envato_Elements
 * @since 0.0.2
 */

namespace Envato_Elements;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}


/**
 * Collection registration and management.
 *
 * @since 0.0.9
 */
class Collection_Elementor_Blocks extends Collection_Elementor {

	public function __construct() {
		parent::__construct();
		$this->category = 'elementor-blocks';
	}


}
