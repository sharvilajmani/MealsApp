// import React from "react";
// import { View, Text, FlatList, StyleSheet } from "react-native";

// import { CATEGORIES, MEALS } from "../data/dummy-data";
// import MealItem from "../components/MealItem";
// import CategoriesScreen from "./CategoriesScreen";

// const CategoryMealScreen = (props) => {
//   const renderMealItem = (itemData) => {
//     return (
//       <MealItem
//         title={itemData.item.title}
//         image={itemData.item.imageUrl}
//         duration={itemData.item.duration}
//         complexity={itemData.item.complexity}
//         affordability={itemData.item.affordability}
//         onSelectMeal={() => {
//           props.navigation.navigate("MealDetail", {
//             mealId: itemData.item.id,
//           });
//         }}
//       />
//     );
//   };

//   // const catId = props.navigation.getParam("categoryId");
//   const catId = props.route.params.categoryId;

//   const displayedMeals = MEALS.filter(
//     (meal) => meal.categoryIds.indexOf(catId) >= 0
//   );

//   const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);
//   props.navigation.setOptions({
//     title: selectedCategory.title,
//   });

//   return (
//     <View style={styles.screen}>
//       <FlatList
//         data={displayedMeals}
//         keyExtractor={(item, index) => item.id}
//         renderItem={renderMealItem}
//         style={{ width: "100%" }}
//       />
//     </View>
//   );
// };

// // CategoryMealScreen.navigationOptions = (navigationData) => {
// //   // const catId = navigationData.navigation.getParam("categoryId");
// //   const catId = props.route.params.categoryId;

// //   const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);

// //   return {
// //     headerTitle: selectedCategory.title,
// //   };
// // };

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 15,
//   },
// });

// export default CategoryMealScreen;

import React from "react";
import { useSelector } from "react-redux";
import { CATEGORIES } from "../data/dummy-data";
import MealList from "../components/MealList";
import DefaultText from "../components/DefaultText";
import { View, Text, FlatList, StyleSheet } from "react-native";

const CategoryMealScreen = (props) => {
  const catId = props.route.params.categoryId;
  const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);
  props.navigation.setOptions({
    title: selectedCategory.title,
  });

  const availableMeals = useSelector((state) => state.meals.filteredMeals);
  const displayedMeals = availableMeals.filter(
    (meal) => meal.categoryIds.indexOf(catId) >= 0
  );

  if (displayedMeals.length === 0) {
    return (
      <View style={styles.content}>
        <DefaultText>No meals found, maybe check your filters?</DefaultText>
      </View>
    );
  }

  return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoryMealScreen;
