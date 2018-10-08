<?php
namespace FEP;

use Elementor\Core\Settings\Manager as SettingsManager;
use Elementor\Utils;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

/**
 * Main Plugin Class
 *
 *
 * @since 1.0.0
 */
class Flexible_Elementor_Panel_Plugin {

	/**
	 * Constructor
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 */
	public function __construct() {

		$this->includes();

        $this->add_actions();

		$this->init_panel();

	}

	public function elementor_accordion_off() { ?>
		<script>
            window.onload = function () {
                jQuery( '.elementor-accordion .elementor-tab-title' ).removeClass( 'elementor-active' );
                jQuery( '.elementor-accordion .elementor-tab-content' ).css( 'display', 'none' );
            };
		</script>
		<?php
	}

	/**
	 * Add Actions
	 *
	 * @since 1.0.0
	 *
	 * @access private
	 */
	private function add_actions() {

		$settings = \FEP\Settings\Manager::get_settings();

		add_action( 'elementor/editor/after_enqueue_styles', function() {
			$settings = \FEP\Settings\Manager::get_settings();

			wp_register_style( 'flexible-elementor-panel-css', plugins_url( '/assets/css/flexible-elementor-panel.css', __FILE__ ), array(), '1', 'all' );
			wp_enqueue_style( 'flexible-elementor-panel-css' );

			wp_register_style( 'flexible-elementor-panel-night-skin-css', plugins_url( '/assets/css/flexible-elementor-panel-night-skin.css', __FILE__ ), array(), '1', 'all' );
			wp_enqueue_style( 'flexible-elementor-panel-night-skin-css' );

//			wp_register_style( 'rulersguides-css', plugins_url( '/assets/css/rulersguides.css', __FILE__ ), array(), '1', 'all' );
//			wp_enqueue_style( 'rulersguides-css' );

			wp_register_script( 'flexible-elementor-panel-js', plugins_url( '/assets/js/flexible-elementor-panel.js', __FILE__ ), array( 'jquery' ) );

            wp_localize_script( 'flexible-elementor-panel-js', 'fepConfig', $settings );

			wp_enqueue_script( 'flexible-elementor-panel-js' );

//			wp_register_script( 'RulersGuides-js', plugins_url( '/assets/js/RulersGuides.js', __FILE__ ), array( 'jquery' ) );
//			wp_enqueue_script( 'RulersGuides-js' );
//
//			wp_register_script( 'bookmarklet-js', plugins_url( '/assets/js/bookmarklet.js', __FILE__ ), array( 'jquery' ) );
//			wp_enqueue_script( 'bookmarklet-js' );
//
//			wp_register_script( 'bookmarklet-ie-js', plugins_url( '/assets/js/bookmarklet_ie.js', __FILE__ ), array( 'jquery' ) );
//			wp_enqueue_script( 'bookmarklet-ie-js' );

		});

		if ($settings['accordion_options'] == 'yes') {
			add_action( 'wp_footer', [ $this, 'elementor_accordion_off' ], 99 );
		}


		/*$(document).on('change', "input[data-setting='accordion_options']", function () {
			fepConfig.accordion_options = $(this).is(':checked') ? 'yes' : 'no';
			loadFepSettings();
		});*/
	}

    /**
     *
     * Include Required Module Files
     *
     * @access private
     */
	private function includes(){

	    require_once FEP_PATH.'inc/settings/manager.php';
	    require_once FEP_PATH.'inc/settings/model.php';
    }

    private function init_panel(){

        SettingsManager::add_settings_manager( new \FEP\Settings\Manager() );
    }

    public function admin_body_class($classes){
        print_r($classes);
        global $pagenow;

        if ( in_array( $pagenow, [ 'post.php', 'post-new.php' ], true ) && Utils::is_post_type_support() ) {

            $settings = get_option('_elementor_fep_settings');
            print_r($settings); die();
        }
        return $classes;

    }

}

new Flexible_Elementor_Panel_Plugin();
