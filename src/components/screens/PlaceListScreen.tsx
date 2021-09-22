import { NavigationProp } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Platform, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";
import { RootState } from "../../../App";
import HeaderButton from "../atoms/HeaderButton/HeaderButton";
import PlaceItem from "../molecules/PlaceItem/PlaceItem";

type PlacesListScreenProps = {
	navigation?: NavigationProp<any>;
};

const PlacesListScreen: React.FC<PlacesListScreenProps> = ({ navigation }) => {
	const places = useSelector((state: RootState) => state.places.places);
	return (
		<FlatList
			data={places}
			keyExtractor={item => item.id}
			renderItem={itemData => (
				<PlaceItem
					image={itemData.item.imageUri}
					title={itemData.item.title}
					address={null}
					onSelect={() => {
						navigation!.navigate("PlaceDetail", {
							placeTitle: itemData.item.title,
							placeId: itemData.item.id,
						});
					}}
				/>
			)}
		/>
	);
};

export const PlacesListScreenOptions = (navData: any) => {
	return {
		headerTitle: "All Places",
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="Add Place"
					iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
					onPress={() => {
						navData.navigation.navigate("NewPlace");
					}}
				/>
			</HeaderButtons>
		),
	};
};

const styles = StyleSheet.create({});

export default PlacesListScreen;
