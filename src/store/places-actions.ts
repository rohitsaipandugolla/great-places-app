import * as FileSystem from "expo-file-system";

export const ADD_PLACE = "ADD_PLACE";

export const addPlace = (title: string, image: string) => {
	return { type: ADD_PLACE, placeData: { title: title, image: image } };
};
