import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import MapScreen, { MapScreenOptions } from "../components/screens/MapScreen";
import NewPlaceScreen, {
	NewPlaceScreenOptions,
} from "../components/screens/NewPlaceScreen";
import PlaceDetailScreen, {
	PlaceDetailScreenOptions,
} from "../components/screens/PlaceDetailScreen";
import PlacesListScreen, {
	PlacesListScreenOptions,
} from "../components/screens/PlaceListScreen";
import colors from "../constants/Colors";

const defaultStackNavOptions = {
	headerStyle: {
		backgroundColor: colors.primary,
	},
};

const Stack = createStackNavigator();

const PlacesNavigator = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={defaultStackNavOptions}>
				<Stack.Screen
					name="Places"
					component={PlacesListScreen}
					options={PlacesListScreenOptions}
				/>
				<Stack.Screen
					name="PlaceDetail"
					component={PlaceDetailScreen}
					options={PlaceDetailScreenOptions}
				/>
				<Stack.Screen
					name="NewPlace"
					component={NewPlaceScreen}
					options={NewPlaceScreenOptions}
				/>
				<Stack.Screen
					name="Map"
					component={MapScreen}
					options={MapScreenOptions}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default PlacesNavigator;
