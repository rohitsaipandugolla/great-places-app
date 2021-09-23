import React, { useState } from "react";
import { View, Button, StyleSheet, Text, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Camera from "expo-camera";

import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";
import colors from "../../../constants/Colors";

type imageType = {
	onImageTaken?: any;
};

const ImgPicker: React.FC<imageType> = ({ onImageTaken }) => {
	const [pickedImage, setPickedImage] = useState("");
	const verifyPermissions = async () => {
		const result = await Camera.requestCameraPermissionsAsync();
		if (result.status !== "granted") {
			Alert.alert(
				"insufficient permissions",
				"You need to grant camera permissions to use this app",
				[{ text: "Okay" }]
			);
			return false;
		}
		return true;
	};

	const takeImageHandler = async () => {
		const hasPermission = await verifyPermissions();
		if (!hasPermission) {
			return;
		}
		const image = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			aspect: [16, 9],
			quality: 0.5,
		});
		const { uri } = image as ImageInfo;
		setPickedImage(uri);
		onImageTaken(uri);
	};
	return (
		<View style={styles.imagePicker}>
			<View style={styles.imagePreview}>
				{!pickedImage ? (
					<Text>No image picked yet.</Text>
				) : (
					<Image style={styles.image} source={{ uri: pickedImage }} />
				)}
				<View style={{ marginTop: 5 }}>
					<Button
						title="Take Image"
						color={colors.primary}
						onPress={takeImageHandler}
					/>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	imagePicker: {
		alignItems: "center",
		marginBottom: 15,
	},
	imagePreview: {
		width: "100%",
		height: 200,
		marginBottom: 10,
		justifyContent: "center",
		alignItems: "center",
		borderColor: "#ccc",
	},
	image: {
		width: "100%",
		height: "100%",
	},
});

export default ImgPicker;
