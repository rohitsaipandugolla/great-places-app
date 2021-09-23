import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
const MapPreview: React.FC<{
	location?: any;
	style?: object;
	onPress: () => void;
}> = props => {
	return (
		<TouchableOpacity
			activeOpacity={0.7}
			onPress={props.onPress}
			style={{ ...styles.mapPreview, ...props.style }}
		>
			{props.location ? (
				<MapView
					style={styles.map}
					region={{
						latitude: props.location.lat,
						longitude: props.location.lng,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					}}
				>
					<Marker
						coordinate={{
							latitude: props.location.lat,
							longitude: props.location.lng,
						}}
					/>
				</MapView>
			) : (
				props.children
			)}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	mapPreview: {
		justifyContent: "center",
		alignItems: "center",
	},
	mapImage: {
		width: "100%",
		height: "100%",
	},
	map: {
		width: 700,
		height: "100%",
	},
});

export default MapPreview;
