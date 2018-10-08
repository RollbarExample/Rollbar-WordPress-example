<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

?>


<script id="tmpl-envato-elements__collections-single--elementor-blocks" type="text/x-handlebars-template">

	<article class="envato-elements__collections-single">
		{{#if collectionThumbnail}}
		<section class="envato-elements__collections-single-thumbnail">
			<a href="{{collectionUrl}}"
				data-nav-type="collection"
				data-category-slug="{{categorySlug}}"
				data-collection-id="{{collectionId}}"
				class="envato-elements__collection-thumb envato-elements--action"
			><img src="{{collectionThumbnail}}"></a>
		</section>
		{{/if}}
		<section class="envato-elements__collections-single-detail">
		</section>
		<section class="envato-elements__collections-single-summary">
			<header>
				<h3 class="envato-elements__collections-single-title{{#if features.new}} envato-elements__collections-single-title--new{{/if}}">{{collectionName}}</h3>
				<span class="envato-elements__collections-single-count">{{templates.length}} templates in this {{contentTypeName}}</span>
			</header>
			<section class="envato-elements__collections-scroller">
				<div class="envato-elements__collections-templates">

				</div>
			</section>
		</section>
	</article>

</script>


<script id="tmpl-envato-elements__collection-template-cell--elementor-blocks" type="text/x-handlebars-template">
	<div class="envato-elements__collection-template-cell envato-elements__collection-blocks {{#if templateInstalled}} imported{{/if}} {{#if templateInserted.length}} imported{{/if}}">
		<div class="envato-elements__collection-template">
			<div class="envato-elements__template-features">
				{{#if templateInstalled}}
				<span class="envato-elements__template-feature envato-elements__template-feature--installed">Imported</span>
				{{else}}
				{{#if templateInserted.length}}
				<span class="envato-elements__template-feature envato-elements__template-feature--installed">Imported</span>
				{{/if}}
				{{/if}}
				{{#each templateFeatures}}
				<span class="envato-elements__template-feature envato-elements__template-feature--{{@key}}">{{small}}</span>
				{{/each}}
			</div>
			<a href="{{templateUrl}}"
				data-nav-type="template"
				data-category-slug="{{categorySlug}}"
				data-collection-id="{{collectionId}}"
				data-template-id="{{templateId}}"
				data-thumb-height="{{previewThumbHeight}}"
				data-src="{{largeThumb.src}}"
				class="envato-elements__collection-block-thumb envato-elements--action"
			><img
					src="{{previewThumb}}"
					width="{{largeThumb.width}}"
					height="{{largeThumb.height}}"
					class="envato-elements__collection-block-preview-placeholder"
					onload="this.parentNode.className = this.parentNode.className + ' --loaded';"
				/>
			</a>
			<!--			<span class="envato-elements__collection-template-label">{{templateName}}</span>-->
		</div>
	</div>
</script>


<script id="tmpl-envato-elements__collection-preview--elementor-blocks" type="text/x-handlebars-template">
	<section class="envato-elements__collection-detail-actions">
		<button type="button"
			data-nav-type="collection-close"
			data-category-slug="{{categorySlug}}"
			class="envato-elements__collection-preview-close envato-elements--action">Close
		</button>

		<p class="envato-elements__collection-preview-label">Page Template:</p>
		<h3 class="envato-elements__collection-preview-title">{{templateName}}</h3>
		<hr>
		{{#if templateError}}
		<div class="envato-elements__collection-template-options">
			<div class="envato-elements-notice envato-elements-notice--warning">

				{{#each templateMissingPlugins}}
				<div class="envato-elements__collection-template-option envato-elements__collection-template-option--edit-template">

					{{#if_eq slug "elementor-pro"}}
					<img src="<?php echo esc_url( ENVATO_ELEMENTS_URI . 'assets/images/elementor-pro.png' ); ?>" width="200"/>
					<p>This Template requires Elementor Pro. Before you can import the template you'll need to buy, install and activate
						<strong> Elementor Pro</strong>.</p>
					<a href="{{{url}}}" class="button button-primary" target="_blank">{{text}}</a>
					{{else}}
					<p>To use this template please ensure all required plugins are installed and active. </p>
					<a href="{{{url}}}" class="button button-primary">{{text}}</a>
					{{/if_eq}}
				</div>
				{{/each}}
			</div>

		</div>

		{{else}}


		<div class="envato-elements__collection-template-options">

			<div class="envato-elements__collection-template-option envato-elements__collection-template-option--edit-template">

				{{#if templateFeatures.elementor-pro}}
				<div class="envato-elements__collection-template-option--help-text">
					<p>This template includes features from</p>
					<img src="<?php echo esc_url( ENVATO_ELEMENTS_URI . 'assets/images/elementor-pro.png' ); ?>" width="200"/>
				</div>
				{{/if}}

				{{#if templateInstalled}}

				<div class="envato-elements__collection-template-option--help-text">
					<p>This template has been imported, it is available in your Elementor
						<a href="<?php echo esc_url( admin_url( 'edit.php?post_type=elementor_library' ) ); ?>">My Templates</a> list for future use.
					</p>
				</div>
				<a href="{{templateInstalledURL}}" class="button button-primary" target="_blank">{{templateInstalledText}}</a>

				{{else}}

				<div class="envato-elements__collection-template-option--help-text">
					<p>Import this template to make it available in your Elementor
						<a href="<?php echo esc_url( admin_url( 'edit.php?post_type=elementor_library' ) ); ?>">My Templates</a> list for future use.
					</p>
				</div>

				<button
					data-nav-type="import-template"
					data-category-slug="{{categorySlug}}"
					data-collection-id="{{collectionId}}"
					data-template-id="{{templateId}}"
					class="button envato-elements-import-button envato-elements--action button-primary"
				>{{templateImportText}} <span></span></button>

				{{/if}}
			</div>

		</div>
		{{/if}}

	</section>
</script>


