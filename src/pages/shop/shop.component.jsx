import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import { convertCollectionsSnapshotToMap, firestore } from '../../firebase/firebase.utils';
import { updateCollections } from '../../redux/shop/shop.actions';


const ShopPage = ({ match, updateShopRedux }) => {
  console.log(match);

  useEffect(() => {
    const collectionRef = firestore.collection('collections');
 
    const unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      //console.log(collectionsMap);
      updateShopRedux(collectionsMap);
    });
    //unsubscribe function
    return () => {
      unsubscribeFromSnapshot();
    };
  }, [updateShopRedux]);

  return (
    <div className="shop-page">
      <Route exact path={`${match.path}`} component={CollectionOverview} />
      <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
    </div>
)};

const mapDispatchToProps = dispatch => ({
  updateShopRedux: collectionsMap => dispatch(updateCollections(collectionsMap))
})



export default connect(null, mapDispatchToProps)(ShopPage);
