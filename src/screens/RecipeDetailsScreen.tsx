import React, {useEffect, useState} from 'react';
import {ScrollView, StatusBar, Text, TouchableOpacity, View, Linking} from 'react-native';
import CashedImage from '../helpers/Image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ChevronLeftIcon, GlobeAltIcon} from 'react-native-heroicons/outline';
import {HeartIcon, ClockIcon, UserIcon, FireIcon} from 'react-native-heroicons/solid';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import Loading from '../components/Loading';

const RecipeDetailsScreen = props => {
  let item = props.route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const navigation = useNavigation();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMealData(item.idMeal);
  }, []);

  const getMealData = async id => {
    try {
      const res = await axios.get(
        `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
      // console.log('res: ', res.data);
      if (res && res.data) {
        setMeal(res.data.meals[0]);
        setLoading(false);
      }
    } catch (error) {
      console.log('error: ', error.message);
      setLoading(false);
    }
  };

  // Function to get all ingredients and their measures
  const getIngredients = () => {
    if (!meal) return [];
    
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]?.trim()) {
        ingredients.push({
          name: meal[`strIngredient${i}`],
          measure: meal[`strMeasure${i}`] || '',
        });
      }
    }
    return ingredients;
  };

  // Function to open YouTube video
  const watchVideo = () => {
    if (meal?.strYoutube) {
      Linking.openURL(meal.strYoutube);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="light-content" />

      {/* Image Container */}
      <View className="relative">
        <CashedImage
          uri={item.strMealThumb}
          style={{
            width: wp(100),
            height: hp(50),
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
          }}
        />

        <View className="absolute top-14 left-0 right-0 flex-row justify-between px-5">
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            className="p-2 rounded-full bg-white">
            <ChevronLeftIcon
              size={hp(3.5)}
              strokeWidth={4.5}
              color="#fbbf24"
            />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => setIsFavorite(!isFavorite)}
            className="p-2 rounded-full bg-white">
            <HeartIcon
              size={hp(3.5)}
              strokeWidth={4.5}
              color={isFavorite ? `red` : `gray`}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Meal description */}
      {loading ? (
        <Loading size="large" className="mt-16" />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 30}}
          className="pt-6">
          
          {/* Title and category */}
          <View className="px-5">
            <Text className="text-3xl font-bold text-neutral-800">
              {meal?.strMeal}
            </Text>
            
            <Text className="text-lg text-neutral-500 mt-1">
              {meal?.strArea} • {meal?.strCategory}
            </Text>
          </View>
          
          {/* Stats row */}
          <View className="flex-row justify-between mx-5 mt-6">
            <View className="flex-row items-center space-x-2">
              <View className="bg-amber-100 p-2 rounded-full">
                <ClockIcon size={hp(3)} color="#fbbf24" />
              </View>
              <View>
                <Text className="text-neutral-500">Prep Time</Text>
                <Text className="text-neutral-800 font-medium">30 mins</Text>
              </View>
            </View>
            
            <View className="flex-row items-center space-x-2">
              <View className="bg-amber-100 p-2 rounded-full">
                <UserIcon size={hp(3)} color="#fbbf24" />
              </View>
              <View>
                <Text className="text-neutral-500">Servings</Text>
                <Text className="text-neutral-800 font-medium">4 people</Text>
              </View>
            </View>
            
            <View className="flex-row items-center space-x-2">
              <View className="bg-amber-100 p-2 rounded-full">
                <FireIcon size={hp(3)} color="#fbbf24" />
              </View>
              <View>
                <Text className="text-neutral-500">Calories</Text>
                <Text className="text-neutral-800 font-medium">320 kcal</Text>
              </View>
            </View>
          </View>
          
          {/* Ingredients section */}
          <View className="mt-8 px-5">
            <Text className="text-xl font-bold text-neutral-800 mb-4">
              Ingredients
            </Text>
            
            <View className="space-y-3 mb-6">
              {getIngredients().map((item, index) => (
                <View 
                  key={index} 
                  className="flex-row items-center space-x-4 pb-2 border-b border-gray-100">
                  <View className="h-2 w-2 bg-amber-400 rounded-full"></View>
                  <Text className="flex-1 text-neutral-800">{item.name}</Text>
                  <Text className="text-neutral-600">{item.measure}</Text>
                </View>
              ))}
            </View>
          </View>
          
          {/* Instructions section */}
          <View className="mt-4 px-5">
            <Text className="text-xl font-bold text-neutral-800 mb-4">
              Instructions
            </Text>
            
            <Text className="text-neutral-600 leading-6 mb-6">
              {meal?.strInstructions}
            </Text>
          </View>
          
          {/* YouTube section */}
          {meal?.strYoutube && (
            <View className="mx-5 mt-4 mb-2">
              <TouchableOpacity
                onPress={watchVideo}
                className="bg-red-500 py-4 rounded-xl flex-row justify-center items-center">
                <Text className="text-white font-bold text-lg">
                  Watch Video Tutorial
                </Text>
              </TouchableOpacity>
            </View>
          )}
          
          {/* Source link */}
          {meal?.strSource && (
            <View className="mt-4 mb-8 flex items-center">
              <TouchableOpacity
                onPress={() => Linking.openURL(meal.strSource)}
                className="flex-row items-center">
                <Text className="text-amber-500 font-medium">
                  View Original Source
                </Text>
                <GlobeAltIcon size={hp(2)} color="#fbbf24" className="ml-1" />
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default RecipeDetailsScreen;