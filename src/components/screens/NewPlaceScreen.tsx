import { NavigationProp, RouteProp } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
	ScrollView,
	View,
	Button,
	Text,
	TextInput,
	StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";
import colors from "../../constants/Colors";

import * as placeActions from "../../store/places-actions";
import ImagePicker from "../organisms/ImagePicker/ImagePicker";
import LocationPicker from "../organisms/LocationPicker/LocationPicker";

type NewPlaceScreenProps = {
	navigation?: NavigationProp<any>;
	route?: RouteProp<any>;
};

const NewPlaceScreen: React.FC<NewPlaceScreenProps> = ({
	navigation,
	route,
}) => {
	const [titleValue, setTitleValue] = useState("");
	const [selectedImage, setSelectedImage] = useState<string>("");
	const [selectedLocation, setSelectedLocation] = useState({});

	const dispatch = useDispatch();

	const titleChangeHandler = (text: string) => {
		setTitleValue(text);
	};

	const savePlaceHandler = () => {
		dispatch(
			placeActions.addPlace(titleValue, selectedImage, selectedLocation)
		);
		navigation!.goBack();
	};

	const imageTakenHandler = (imagePath: string) => {
		setSelectedImage(imagePath);
	};
	const locationPickedHandler = useCallback(location => {
		setSelectedLocation(location);
		console.log("newPlace----->", location);
	}, []);

	return (
		<ScrollView>
			<View style={styles.form}>
				<Text style={styles.label}>Title</Text>
				<TextInput
					style={styles.textInput}
					onChangeText={titleChangeHandler}
					value={titleValue}
				/>
				<ImagePicker onImageTaken={imageTakenHandler} />
				<LocationPicker
					navigation={navigation}
					route={route}
					onLocationPicked={locationPickedHandler}
				/>
				<Button
					title="Save Place"
					color={colors.primary}
					onPress={savePlaceHandler}
				/>
			</View>
		</ScrollView>
	);
};

export const NewPlaceScreenOptions = (navData: any) => {
	return {
		headerTitle: "Add Place",
	};
};
const styles = StyleSheet.create({
	form: {
		margin: 30,
	},
	label: {
		fontSize: 18,
		marginBottom: 15,
	},
	textInput: {
		borderBottomColor: "#ccc",
		borderBottomWidth: 1,
		marginBottom: 15,
		paddingVertical: 4,
		paddingHorizontal: 2,
	},
});

export default NewPlaceScreen;
