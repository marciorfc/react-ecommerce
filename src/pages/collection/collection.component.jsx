import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './collection.styles.scss';

import CollectionItem from '../../components/collection-item/collection-item.component';
import { selectCollection } from '../../redux/shop/shop.selector';

const Collection = ({ collection }) => {
    const {title, items} = collection;
 
    return (
        <div className="collection">
            <h1 className="title">{title.toUpperCase()}</h1>
            <div className="collection-items">
            {items.map(item => (
                <CollectionItem key={item.id} item={item} />
            ))}
            </div>
       </div>
)};

const mapStateToProps = (state, ownProps) => createStructuredSelector({
    collection : selectCollection(ownProps.match.params['collectionId'])
});

export default connect(mapStateToProps)(Collection);