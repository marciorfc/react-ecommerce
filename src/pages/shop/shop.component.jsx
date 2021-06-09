import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import { convertCollectionsSnapshotToMap, firestore } from '../../firebase/firebase.utils';
import { updateCollections } from '../../redux/shop/shop.actions';


const CollectionsOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = ({ match, updateShopRedux }) => {
  console.log(match);

  const [ loading, setLoading ] = useState(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    async function fetchData() {
      const collectionRef = firestore.collection('collections');
      try {
        const snapshot = await collectionRef.get();
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        updateShopRedux(collectionsMap);
        setLoading(false);
      } catch(error) {
        console.log(error);
      }  
    }
    console.log('fetch collections');
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="shop-page">
      <Route exact path={`${match.path}`} 
                   render={props => 
                              <CollectionsOverviewWithSpinner isLoading={loading} {...props} /> 
                          }/>
      <Route path={`${match.path}/:collectionId`} 
                   render={props => 
                              <CollectionPageWithSpinner isLoading={loading} {...props} /> 
                          }/>
    </div>
)};

const mapDispatchToProps = dispatch => ({
  updateShopRedux: collectionsMap => dispatch(updateCollections(collectionsMap))
})



export default connect(null, mapDispatchToProps)(ShopPage);
