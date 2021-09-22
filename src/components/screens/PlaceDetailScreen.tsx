import { NavigationProp, RouteProp } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

type PlaceDetailScreenProps = {
	navigation?: NavigationProp<any>;
	route: RouteProp<any>;
};

const PlaceDetailScreen: React.FC<PlaceDetailScreenProps> = ({
	navigation,
	route,
}) => {
	return (
		<View>
			<Text>PlaceDetailScreen</Text>
		</View>
	);
};

export const PlaceDetailScreenOptions = (navData: any) => {
	const placeTitle = navData.route.params.placeTitle;
	// const categoryId = navigationData.route.params.categoryId;

	return {
		headerTitle: placeTitle,
	};
};

const styles = StyleSheet.create({});

export default PlaceDetailScreen;
