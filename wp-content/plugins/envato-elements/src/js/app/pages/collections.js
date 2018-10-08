import { config } from '../utils/config';
import { collectionsCache } from '../objects/collections';
import { collectionCache } from '../objects/collection';
import { template } from '../utils/template';

class KitCollections {
  constructor() {
    this.categories = config.get( 'categories' );
  }

  pageLoaded = () => {
  };

  loadCategoryItems = ( navType, categorySlug, searchParams ) => {

    const category = this.categories[ categorySlug ];
    const collections = collectionsCache.getItem( {
      category: category,
      pageTitle: category.page_title,
      categorySlug: categorySlug,
      searchParams: searchParams,
    } );

    if ( config.state( 'requestedCategorySlug' ) === categorySlug && 'collection-close' === navType ) {
      collections.closeCollections();
    } else {
      config.state( 'requestedCategorySlug', categorySlug );
      collections.renderPageFromAPI()
        .then( () => {
          collections.closeCollections();
        } )
        .catch( () => {

        } );
    }

  };

  loadCollectionItems = ( navType, categorySlug, searchParams, collectionId, templateId ) => {

    const category = this.categories[ categorySlug ];

    if ( config.state( 'requestedCategorySlug' ) === categorySlug ) {
      // We already have the loaded category DOM on page from above.
      const collections = collectionsCache.getItem( {
        category: category,
        pageTitle: category.page_title,
        categorySlug: categorySlug,
        searchParams: searchParams,
      } );
      config.state( 'requestedCollectionId', collectionId );
      config.state( 'requestedTemplateId', templateId );
      switch ( navType ) {
        case 'collection':
          collections.openCollection( collectionId );
          break;
        case 'template':
          // Highlight individual template.
          collections.openCollection( collectionId, templateId );
          break;
      }
    } else {
      // user is refreshing the page or direct navigation to a template.
      // Load it individually outside of the parent collections store.
      const collection = collectionCache.getItem( {
        category: category,
        pageTitle: category.page_title,
        categorySlug: categorySlug,
        searchParams: searchParams,
        collectionId: collectionId,
      } );
      collection.renderCollectionFromAPI()
        .then( () => {
          config.state( 'requestedCollectionId', collectionId );
          if ( templateId ) {
            config.state( 'requestedTemplateId', templateId );
            collection.openDetailView( templateId );
          } else {
            collection.openDetailView();
          }
        } )
        .catch( () => {

        } );
    }

  };

  navigationChange = ( admin, query, action ) => {

    if ( query && query.categorySlug && action && query.navType ) {
      if ( 'undefined' !== typeof this.categories[ query.categorySlug ] ) {

        switch ( query.navType ) {
          case 'main-category':
            // Loading the main category page with all the small thumbs.
            'POP' !== action && admin.history.push( '?' + config.get( 'admin_slug' ) + '&category=' + query.categorySlug, 'history' );
            this.loadCategoryItems( query.navType, query.categorySlug, query.searchParams );
            break;
          case 'category':
          case 'collection-close':
            // Inside pages with pagination and search
            'POP' !== action && admin.history.push( '?' + config.get( 'admin_slug' ) + '&category=' + query.categorySlug + '&search=' + query.searchParamsURI, 'history' );
            this.loadCategoryItems( query.navType, query.categorySlug, query.searchParams );
            break;
          case 'collection':
            // Clicked into a collection (default showing the first thumb).
            'POP' !== action && admin.history.push( '?' + config.get( 'admin_slug' ) + '&category=' + query.categorySlug + '&collection_id=' + query.collectionId + '&search=' + query.searchParamsURI, 'history' );
            this.loadCollectionItems( query.navType, query.categorySlug, query.searchParams, query.collectionId );
            break;
          case 'template':
            // Choosing a specific item within a collection.
            'POP' !== action && admin.history.push( '?' + config.get( 'admin_slug' ) + '&category=' + query.categorySlug + '&collection_id=' + query.collectionId + '&template_id=' + query.templateId + '&search=' + query.searchParamsURI, 'history' );
            this.loadCollectionItems( query.navType, query.categorySlug, query.searchParams, query.collectionId, query.templateId );
            break;
        }

      }
    }

  };

}

export let kitCollections = new KitCollections();
