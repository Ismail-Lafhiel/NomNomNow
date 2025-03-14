import {Image, StatusBar, Text, TextInput, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {BellIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Categories from '../components/Categories';
import Recipes from '../components/Recipes';
const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState('Beef');
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    getCategories();
    getMeals();
  }, []);

  const getCategories = async () => {
    try {
      const res = await axios.get(
        'https://themealdb.com/api/json/v1/1/categories.php',
      );
      // console.log('res: ', res.data);
      if (res && res.data) {
        setCategories(res.data.categories);
      }
    } catch (error) {
      console.log('error: ', error.message);
    }
  };

  const getMeals = async (category = 'Beef') => {
    try {
      const res = await axios.get(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`,
      );
      // console.log('res: ', res.data);
      if (res && res.data) {
        setMeals(res.data.meals);
      }
    } catch (error) {
      console.log('error: ', error.message);
    }
  };

  const handleCategoryChange = (category: string) => {
    getMeals(category);
    setActiveCategory(category);
    setMeals([]);
  };
  return (
    <View>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 50}}
        className="space-y-6 pt-14">
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image
            source={require('../assets/images/avatar.png')}
            style={{height: hp(5), width: hp(5.5)}}
          />
          <BellIcon size={hp(4)} color="gray" />
        </View>

        <View className="mx-4 space-y-2 mb-2">
          <Text style={{fontSize: hp(1.7)}} className="text-neutral-600">
            Hello User!
          </Text>
          <View>
            <Text
              style={{fontSize: hp(3.8)}}
              className="font-semibold text-neutral-600 font-burrito">
              Make your own food
            </Text>
          </View>
          <Text
            style={{fontSize: hp(3.8)}}
            className="font-semibold text-neutral-600 font-burrito">
            Stay at <Text className="text-amber-400">Home</Text>
          </Text>
        </View>

        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder="Search for a dish"
            style={{fontSize: hp(1.7)}}
            placeholderTextColor={'gray'}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
          />
          <View className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon
              size={hp(2.5)}
              strokeWidth={3}
              color={'gray'}
            />
          </View>
        </View>

        {/* categories */}
        <View>
          {categories.length > 0 && (
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              handleCategoryChange={handleCategoryChange}
            />
          )}
        </View>
        {/* recipes */}
        <View>
          <Recipes meals={meals} categories={categories} />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
