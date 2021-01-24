import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createAppContainer } from "react-navigation";
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FiltersScreen from "../screens/FiltersScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import { Platform, Text } from "react-native";
import Colors from "../constants/Colors";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

// const MealsNavigator = createStackNavigator(
//   {
//     Categories: CategoriesScreen,
//     CategoryMeals: { screen: CategoryMealsScreen },
//     MealDetail: MealDetailScreen,
//   },
//   {
//     defaultNavigationOptions: {
//       headerStyle: {
//         backgroundColor:
//           Platform.OS === "android" ? Colors.primaryColor : "white",
//       },
//       headerTintColor:
//         Platform.OS === "android" ? "white" : Colors.primaryColor,
//     },
//   }
// );
const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "white",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
};

const Stack = createStackNavigator();
const MealsNavigator = () => (
  <Stack.Navigator screenOptions={defaultStackNavOptions}>
    <Stack.Screen name="Categories" component={CategoriesScreen} />
    <Stack.Screen name="CategoryMeals" component={CategoryMealsScreen} />
    <Stack.Screen name="MealDetail" component={MealDetailScreen} />
  </Stack.Navigator>
);

const FavNavigator = () => (
  <Stack.Navigator screenOptions={defaultStackNavOptions}>
    <Stack.Screen name="Favorites" component={FavoritesScreen} />
    <Stack.Screen name="MealDetail" component={MealDetailScreen} />
  </Stack.Navigator>
);

// const MealsFavTabNavigator = createBottomTabNavigator({
//   Meals: MealsNavigator,
//   Favorites: FavoritesScreen,
// });

const Tab = createMaterialBottomTabNavigator();

const MealsFavTabNavigator = () => (
  <Tab.Navigator
    // tabBarOptions={{
    //   activeTintColor: Colors.accentColor,
    // }}
    activeColor="white"
    shifting={true}
    barStyle={{ backgroundColor: Colors.primaryColor }}
  >
    <Tab.Screen
      name="Meals"
      component={MealsNavigator}
      options={{
        tabBarIcon: ({ color }) => {
          return <Ionicons name="ios-restaurant" size={25} color={color} />;
        },
        tabBarColor: Colors.primaryColor,
        tabBarLabel: (
          <Text style={{ fontFamily: "open-sans-bold" }}>Meals</Text>
        ),
      }}
    />
    <Tab.Screen
      name="Favorites"
      component={FavNavigator}
      options={{
        tabBarIcon: ({ color }) => {
          return <Ionicons name="ios-star" size={25} color={color} />;
        },
        tabBarLabel: (
          <Text style={{ fontFamily: "open-sans-bold" }}>Meals</Text>
        ),
        tabBarColor: Colors.accentColor,
      }}
    />
  </Tab.Navigator>
);

const FiltersNavigator = () => (
  <Stack.Navigator screenOptions={defaultStackNavOptions}>
    <Stack.Screen name="Filters" component={FiltersScreen} />
  </Stack.Navigator>
);

const Drawer = createDrawerNavigator();
const MainNavigator = () => (
  <NavigationContainer>
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: Colors.accentColor,
        labelStyle: {
          fontFamily: "open-sans-bold",
        },
      }}
    >
      <Drawer.Screen
        name="MealsFavs"
        component={MealsFavTabNavigator}
        options={{
          drawerLabel: "Meals",
        }}
      />
      <Drawer.Screen name="Filters" component={FiltersNavigator} />
    </Drawer.Navigator>
  </NavigationContainer>
);

export default MainNavigator;
