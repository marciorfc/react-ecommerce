import React, { useEffect} from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPage from '../collection/collection.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selector';




const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = ({ match, fetchCollectionsStartAsync, isCollectionsLoaded }) => {
  console.log(match);

  useEffect(() => {
    console.log('fetch collections');
    fetchCollectionsStartAsync();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="shop-page">
      <Route exact path={`${match.path}`} 
                   component={CollectionsOverviewContainer} />
      <Route path={`${match.path}/:collectionId`} 
                   render={props => 
                              <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props} /> 
                          }/>
    </div>
)};

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})


const mapStateToProps = createStructuredSelector({
  isCollectionsLoaded: selectIsCollectionsLoaded
});


export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
