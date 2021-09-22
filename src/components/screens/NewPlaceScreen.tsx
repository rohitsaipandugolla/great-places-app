import { NavigationProp } from "@react-navigation/native";
import React, { useState } from "react";
import {
	ScrollView,
	View,
	Button,
	Text,
	TextInput,
	StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";

import Colors from "../../constants/Colors";
import * as placesActions from "../../store/places-actions";
import ImagePicker from "../organisms/ImagePicker/ImagePicker";

type NewPlaceScreenProps = {
	navigation?: NavigationProp<any>;
};

const NewPlaceScreen: React.FC<NewPlaceScreenProps> = ({ navigation }) => {
	const [titleValue, setTitleValue] = useState("");
	const [selectedImage, setSelectedImage] = useState<string>("");

	const dispatch = useDispatch();

	const titleChangeHandler = (text: string) => {
		setTitleValue(text);
	};

	const savePlaceHandler = () => {
		dispatch(placesActions.addPlace(titleValue, selectedImage));
		navigation!.goBack();
	};

	const imageTakenHandler = (imagePath: string) => {
		setSelectedImage(imagePath);
	};

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
				<Button
					title="Save Place"
					color={Colors.primary}
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
