import { config } from '../utils/config';
import { template } from '../utils/template';
import { api } from '../utils/api';
import { error } from '../utils/error';
import { collectionCache } from './collection';

import ObjectCache from '../utils/objectCache';
import { clearAllBodyScrollLocks } from 'body-scroll-lock';
import $ from 'jquery';

export let collectionsCache = new ObjectCache( ( cache, settings ) => {
  const key = settings && settings.categorySlug ? settings.categorySlug : 'loading';
  if ( 'undefined' === typeof cache[ key ] ) {
    cache[ key ] = new Collections();
  }
  cache[ key ].updateData( settings );
  return cache[ key ];
} );

class Collections {
  constructor( { categorySlug } = {} ) {

    this.data = {
      categorySlug: categorySlug,
      pageTitle: 'Items',
      collections: [],
      searchParams: {},
    };
    this.meta = {};

    this.currentlyOpen = null;
  }

  updateData = ( apiData ) => {
    Object.assign( this.data, this.data, apiData );
  };

  // Meta is used for things like global filters (industry)
  updateMeta = ( apiMeta ) => {
    Object.assign( this.meta, this.meta, apiMeta );
  };

  renderPageFromAPI = () => {
    return new Promise( ( resolve, reject ) => {
      template.pageLoading();
      api.post( 'collections/' + this.data.categorySlug, {
        elementsSearch: this.data.searchParams
      } )
        .then(
          ( json ) => {
            if ( json && json.data ) {

              // Reset available collections each time we do a search.
              this.data.collections = [];
              this.updateData( json.data );

              if ( config.state( 'requestedCategorySlug' ) !== this.data.categorySlug ) {
                return reject();
              }

              if ( typeof json.meta !== 'undefined' ) {
                this.updateMeta( json.meta );
              }

              this.$dom = template.renderMainDom( 'tmpl-envato-elements__collections', this.getReplaceData() );
              this.$collectionsHolder = this.$dom.find( '.envato-elements__collections-content' );
              if ( this.$collectionsHolder && this.data.collections && this.data.collections.length ) {
                for ( var c of this.data.collections ) {
                  const collection = collectionCache.getItem( c, this );
                  collection.renderSummaryDom( this.$collectionsHolder );
                }
              }

              config.state( 'currentCategorySlug', this.data.categorySlug );
              template.mainRenderFinished();
              resolve();
            } else {
              error.displayError( 'Collections Data JSON Error', json && typeof json.error !== 'undefined' ? json.error : 'Sorry something went wrong. If this continues to happen please <a href="mailto:extensions@envato.com">report the bug to us</a>.' );
              reject();
            }
          },
          ( err ) => {
            if ( err && typeof err.code !== 'undefined' && err.code === 'rest_cookie_invalid_nonce' ) {
              error.displayError( 'API Token Expired', 'Refreshing please wait...' );
              setTimeout( function () { window.location.reload(); }, 500 );
            } else {
              error.displayError( 'Collections Data Error', typeof err.error !== 'undefined' ? err.error : 'Sorry something went wrong. If this continues to happen please <a href="mailto:extensions@envato.com">report the bug to us</a>.' );
            }
            reject();
          }
        );
    } );
  };

  closeCollections = () => {
    clearAllBodyScrollLocks();
    if ( this.currentlyOpen ) {
      this.currentlyOpen.closeDetailView();
      this.currentlyOpen = null;
    }
    setTimeout( () => {
      // Resize after disable scroll so fixed boxes sort themselves out.
      $( window ).trigger( 'resize' );
    }, 50 );

  };

  openCollection = ( collectionId, templateId ) => {
    const collection = collectionCache.getItem( { collectionId: collectionId } );
    if ( collection ) {
      if ( this.currentlyOpen && (!templateId || this.currentlyOpen !== collection) ) {
        this.closeCollections();
      }
      this.currentlyOpen = collection;
      if ( templateId ) {
        collection.openDetailView( templateId );
      } else {
        collection.openDetailView();
      }
    }
  };

  getReplaceData = () => {
    this.data.pagination = [];
    if ( this.data.page_number && this.data.total_results && this.data.per_page ) {
      if ( this.data.total_results > this.data.per_page ) {
        for ( let pg = 0; pg < this.data.total_results / this.data.per_page; pg++ ) {
          this.data.pagination.push( {
            'pageNumber': pg,
            'pageLabel': pg + 1,
            'pageCurrent': parseInt( this.data.page_number ) === pg + 1,
          } );
        }
      }
    }
    this.data.meta = this.meta;
    return this.data;
  };

}