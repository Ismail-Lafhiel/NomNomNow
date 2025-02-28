import React from 'react';
import {Text, View} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import Loading from './Loading';
import RecipeCard from './RecipeCard';
import {useNavigation} from '@react-navigation/native';

const Recipes = ({meals, categories}) => {
  const navigation = useNavigation();
  return (
    <View className="mx-4 space-y-3" style={{margin: hp(2)}}>
      <Text
        style={{fontSize: hp(4), padding: hp(2)}}
        className="font-burrito text-neutral-600">
        Recipes
      </Text>
      <View>
        {categories.length == 0 || meals.length == 0 ? (
          <Loading size="large" className="mt-20" />
        ) : (
          <MasonryList
            data={meals}
            keyExtractor={item => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({item, i}) => (
              <RecipeCard item={item} index={i} navigation={navigation} />
            )}
            onEndReachedThreshold={0.1}
          />
        )}
      </View>
    </View>
  );
};

export default Recipes;
