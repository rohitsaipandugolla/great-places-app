import * as FileSystem from "expo-file-system";
import { fetchPlaces, insertPlace } from "../helper/db";

export type placeActionType = {
	type: string;
	placeData: { id: string; title: string; image: string };
};

export type resultType = {
	insertId: number;
	rows: Object;
	rowsAffected: number;
};

export type placesResultType = {
	insertId: any;
	rows: { _array: Array<placeType>; length: number };
	rowsAffected: number;
};
export type placeType = Array<{
	address: string;
	id: number;
	imageUri: string;
	lat: number;
	lng: number;
	title: string;
}>;

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";

export const addPlace = (title: string, image: string, location: any) => {
	return async (
		dispatch: (arg0: {
			type: string;
			placeData: {
				id: string;
				title: string;
				image: string | null;
				address: string;
				coords: { lat: number; lng: number };
			};
		}) => void
	) => {
		const fileName = image.split("/").pop();
		let newPath = "";
		newPath = FileSystem.documentDirectory
			? FileSystem.documentDirectory + fileName
			: "";
		try {
			await FileSystem.moveAsync({
				from: image,
				to: newPath,
			});
			const dbResult: any = await insertPlace(
				title,
				newPath,
				"Dummy Address",
				location.lat,
				location.lng
			);
			dispatch({
				type: ADD_PLACE,
				placeData: {
					id: dbResult.insertId.toString(),
					title: title,
					image: newPath,
					address: "Dummy",
					coords: { lat: location.lat, lng: location.lng },
				},
			});
		} catch (err) {
			console.log(err);
			throw err;
		}
	};
};

export const loadPlaces = () => {
	return async (
		dispatch: (arg0: {
			type: string;
			places: placesResultType["rows"]["_array"];
		}) => void
	) => {
		try {
			const dbPlacesResult: any = await fetchPlaces();
			//	console.log(dbPlacesResult);
			dispatch({
				type: SET_PLACES,
				places: [dbPlacesResult.rows._array],
			});
		} catch (err) {
			throw err;
		}
	};
};
