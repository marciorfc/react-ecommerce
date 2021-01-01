import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'

import { selectShopCollections } from '../../redux/shop/shop.selector';

import CollectionPreview from '../../components/preview-collection/collection-preview.component';


const ShopPage = ({ collections }) => (
    <div className="shop-page">
      {collections.map(({ id, ...otherCollectionProps }) => {
        return <CollectionPreview key={id} {...otherCollectionProps} />;
      })}
    </div>
);

const mapStateToProps = createStructuredSelector({
  collections: selectShopCollections
});

export default connect(mapStateToProps, null)(ShopPage);
