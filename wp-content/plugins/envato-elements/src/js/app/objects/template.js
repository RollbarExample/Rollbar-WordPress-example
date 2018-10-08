import $ from 'jquery';
import { template } from '../utils/template';
import { lazyLoader } from '../utils/lazyLoader';

import ObjectCache from '../utils/objectCache';
import OverlayScrollbars from 'overlayscrollbars';

export let templateCache = new ObjectCache( ( cache, settings, parent ) => {
  const key = settings && settings.templateId ? settings.templateId : 'loading';
  if ( 'undefined' === typeof cache[ key ] ) {
    cache[ key ] = new Template( settings );
  }
  if ( parent ) {
    cache[ key ].setParent( parent );
  }
  cache[ key ].updateData( settings );
  return cache[ key ];
} );

export default class Template {
  constructor( { templateId = false } = {} ) {

    this.data = {
      templateId: templateId,
      templateName: 'loading',
      templateUrl: '#',
      previewThumb: '#',
      previewThumbAspect: '100%'
    };

    this.$dom = null;
    this.lastScrollPos = 0;
    this.lastImageMarginTop = 0;
    this.verticalScroll = null;
  }

  setParent = ( parent ) => {
    if ( parent ) {
      this.parent = parent;
    }
  };

  updateData = ( apiData ) => {
    Object.assign( this.data, this.data, apiData );
  };

  getReplaceData = () => {
    let data = this.data;
    if ( this.parent ) {
      data = Object.assign( {}, this.parent.getReplaceData(), data );
    }
    return data;
  };

  updateTemplateDom = () => {
    if ( this.$dom ) {
      let newOne = template.getDom( 'tmpl-envato-elements__collection-template-cell', this.getReplaceData() );
      this.$dom.replaceWith( newOne );
      this.$dom = newOne;
      lazyLoader.addLazy( this.$dom );
      lazyLoader.checkVisibleCallback();
    }
  };

  renderTemplateDom = ( $container ) => {
    this.$dom = template.getDom( 'tmpl-envato-elements__collection-template-cell', this.getReplaceData() );
    $container.append( this.$dom );
    lazyLoader.addLazy( this.$dom );
  };

  renderHighlightedDom = ( $detailContainer ) => {
    $( '.envato-elements__collection-template-cell--active' ).removeClass( 'envato-elements__collection-template-cell--active' );
    this.$dom.addClass( 'envato-elements__collection-template-cell--active' );
    let $preview = template.getDom( 'tmpl-envato-elements__collection-preview', this.getReplaceData() );
    $detailContainer.empty().append( $preview );
    if ( this.verticalScroll ) {
      this.verticalScroll.destroy();
      this.verticalScroll = null;
    }
    this.verticalScroll = OverlayScrollbars( $detailContainer.find( '.envato-elements__collection-detail-thumbnail' ), {
      className: 'os-theme-round-dark',
      overflowBehavior: {
        x: 'hidden'
      },
      scrollbars: {
        autoHide: 'never'
      }
    } );
  };

}
