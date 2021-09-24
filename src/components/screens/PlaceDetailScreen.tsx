import { NavigationProp, RouteProp } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useSelector } from "react-redux";
import { RootState } from "../../../App";
import Place from "../../models/place";
import MapPreview from "../molecules/MapPreview/MapPreview";

type PlaceDetailScreenProps = {
	navigation?: NavigationProp<any>;
	route: RouteProp<any>;
};

const PlaceDetailScreen: React.FC<PlaceDetailScreenProps> = ({
	navigation,
	route,
}) => {
	const placeId = route.params!.placeId;
	const selectedPlace = useSelector((state: RootState) =>
		state.places.places.find((place: Place) => place.id === placeId)
	);

	const selectedLocation = { lat: selectedPlace.lat, lng: selectedPlace.lng };

	return (
		<ScrollView contentContainerStyle={{ alignItems: "center" }}>
			<Image source={{ uri: selectedPlace.imageUri }} style={styles.image} />
			<View style={styles.locationContainer}>
				<View style={styles.addressContainer}>
					<Text style={styles.address}>
						Latitude--&gt;{selectedLocation.lat}
					</Text>
					<Text style={styles.address}>
						Longitude--&gt;{selectedLocation.lat}
					</Text>
				</View>
			</View>
		</ScrollView>
	);
};

export const PlaceDetailScreenOptions = (navData: any) => {
	return {
		headerTitle: navData.route.params.placeTitle,
	};
};

const styles = StyleSheet.create({
	image: {
		height: "35%",
		minHeight: 300,
		width: "100%",
		backgroundColor: "#ccc",
	},
	locationContainer: {
		marginVertical: 20,
		width: "90%",
		maxWidth: 350,
		justifyContent: "center",
		alignItems: "center",
		shadowColor: "black",
		shadowOpacity: 0.26,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 8,
		elevation: 5,
		backgroundColor: "white",
		borderRadius: 10,
	},
	addressContainer: {
		padding: 20,
	},
	address: {
		color: Colors.primary,
		textAlign: "center",
	},
	mapPreview: {
		width: "100%",
		maxWidth: 350,
		height: 300,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
	},
});

export default PlaceDetailScreen;
