<?php

namespace FEP\Settings;

use Elementor\Core\Settings\Base\Model as BaseModel;
use Elementor\Controls_Manager;
use Elementor\Settings;
use Elementor\Scheme_Color;

class Model extends BaseModel
{
	public function get_name()
	{
		// TODO: Implement get_name() method.
	}

	public function get_css_wrapper_selector()
	{
		// TODO: Implement get_css_wrapper_selector() method.
	}

	public function get_panel_page_settings()
	{
		// TODO: Implement get_panel_page_settings() method.

		return [
			'title' => __( 'FEP Settings', 'elementor-fep' ),
			'menu' => [
				'icon' => 'fa fa-arrows-alt cws-logo-icon-settings',
				'beforeItem' => 'elementor-settings',
			],
		];
	}

	public static function get_controls_list() {

		return [

			Controls_Manager::TAB_SETTINGS => [
				'settings'  => [
					'label'     => __('Settings', 'fep'),
					'controls'  => [
						'fep_ux_heading' =>
							[
								'label' => __('Panel settings', 'fep'),
								'type'  => Controls_Manager::HEADING,
								'description' => __( 'Click the right mouse button on the panel to collapse all categories of widgets', 'fep' ),
							],
						'draggable_panel' =>
	                        [
		                        'description' => __( 'you can detach and move panel', 'fep' ),
		                        'label' => __('Draggable panel', 'fep'),
		                        'type'  => Controls_Manager::SWITCHER,
		                        'label_on' => __('On', 'ae-pro'),
		                        'label_off' => __('Off', 'ae-pro'),
		                        'return_value' => 'yes',
	                        ],

						'minimize_category_space'  => [
							'label' => __('Minimize UX', 'fep'),
							'type'  => Controls_Manager::SWITCHER,
							'label_on' => __('On', 'ae-pro'),
							'label_off' => __('Off', 'ae-pro'),
							'return_value' => 'yes',
							'description' => __( 'click the right mouse button on the panel to collapse all categories of widgets', 'fep' ),
						],
//						'use_grid_ruler'  => [
//							'label' => __('Use Grid Ruler', 'fep'),
//							'type'  => Controls_Manager::SWITCHER,
//							'label_on' => __('On', 'ae-pro'),
//							'label_off' => __('Off', 'ae-pro'),
//							'return_value' => 'yes',
//							'description' => __( 'This option adds top and left margins to the Elementor editor to use the <a style="font-weight: 300" href="https://chrome.google.com/webstore/detail/grid-ruler/joadogiaiabhmggdifljlpkclnpfncmj">Grid Rulers Chrome Extension.</a> Click the Grid Ruler icon in Chrome to display and use the rulers.', 'fep' ),
//						],
						'editor_skin' =>
							[
								'label' => __('Editor skins', 'fep'),
								'type'  => Controls_Manager::SELECT,
								'options'   => [
									'dark'    =>     __('Dark', 'fep'),
									'light'   =>     __('Light', 'fep')
								]
							],
						'dashboard_link_heading' =>
							[
								'label' => __('Exit to dashboard options', 'fep'),
								'type'  => Controls_Manager::HEADING
							],
						'dashboard_link_point' =>
							[
								'label' => __('Exit point', 'fep'),
								'type'  => Controls_Manager::SELECT,
								'options'   => [
									'page_edit'         =>      __('Page edit', 'fep'),
									'page_list'         =>      __('Page list', 'fep'),
									'admin_dashboard'   =>      __('Admin dashboard', 'fep'),
									'elementor_library' =>      __('Elementor library', 'fep'),
								]
							],
						'dashboard_link_new_tab' =>
							[
								'label' => __('Open in new tab', 'fep'),
								'type'  => Controls_Manager::SWITCHER,
								'label_on' => __('On', 'ae-pro'),
								'label_off' => __('Off', 'ae-pro'),
								'return_value' => 'yes',
							],
						'accordion_heading' =>
							[
								'label' => __('Accordion widget options', 'fep'),
								'type'  => Controls_Manager::HEADING
							],
						'accordion_options' =>
							[
								'label' => __('First tab closed', 'fep'),
								'type'  => Controls_Manager::SWITCHER,
								'label_on' => __('On', 'ae-pro'),
								'label_off' => __('Off', 'ae-pro'),
								'return_value' => 'yes',
							],
					]
				]
			]
		];

	}

	protected function _register_controls() {

		$controls_list = self::get_controls_list();

		foreach ( $controls_list as $tab_name => $sections ) {

			foreach ( $sections as $section_name => $section_data ) {

				$this->start_controls_section(
					$section_name, [
						'label' => $section_data['label'],
						'tab' => $tab_name,
					]
				);

				foreach ( $section_data['controls'] as $control_name => $control_data ) {
					$this->add_control( $control_name, $control_data );
				}

				$this->end_controls_section();
			}
		}
	}
}

Controls_Manager::add_tab( 'settings', __( 'Settings', 'elementor-extras' ) );

