<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

?>

<div class="envato-elements__header-logo">
	<a href="<?php echo esc_url( Envato_Elements\Plugin::get_instance()->get_url() ); ?>"><img src="<?php echo esc_url( ENVATO_ELEMENTS_URI . 'assets/images/envato-elements-template-kits.svg' ); ?>" alt="Envato Elements"></a>
</div>

<nav class="envato-elements__header-menu">
	<?php
	if ( Envato_Elements\License::get_instance()->is_activated() ) {
		Envato_Elements\Category::get_instance()->header_nav();
		Envato_Elements\Section::get_instance()->header_nav();
	}
	?>
</nav>

<?php
\Envato_Elements\Notifications::get_instance()->header_nav();
?>

<div class="envato-elements__importer-wrapper">
</div>



