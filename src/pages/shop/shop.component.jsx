import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import {
	firestore,
	convertCollectionsSnapshotToMap
} from '../../firebase/firebase.utils';

import { updateCollections } from '../../redux/shop/shop.actions';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../../components/collection/collection.component';

import './shop.styles.scss';

class ShopPage extends Component {
	unsubscribeFromSnapshot = null;

	componentDidMount() {
		const { updateCollections } = this.props;

		const collectionRef = firestore.collection('collections');

		collectionRef.onSnapshot(async snapshot => {
			const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
			updateCollections(collectionsMap);
		});
	}

	render() {
		const { match } = this.props;

		return (
			<div className="shop-page">
				<Route exact path={`${match.path}`} component={CollectionsOverview} />
				<Route
					path={`${match.path}/:collectionId`}
					component={CollectionPage}
				/>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	updateCollections: collectionsMap =>
		dispatch(updateCollections(collectionsMap))
});

export default connect(
	null,
	mapDispatchToProps
)(ShopPage);
