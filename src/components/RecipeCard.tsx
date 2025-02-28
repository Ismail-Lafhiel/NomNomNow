import React from 'react';
import {Pressable, Text} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, {FadeInDown} from 'react-native-reanimated';
import CashedImage from '../helpers/Image';

const RecipeCard = ({item, index}) => {
  const isEven = index % 2 === 0;
  const useSmallHeight = index % 3 === 0;

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping(12)}>
      <Pressable
        style={{
          width: '100%',
          paddingLeft: isEven ? 0 : 8,
          paddingRight: isEven ? 8 : 0,
        }}
        className="flex justify-center mb-4 space-y-1">
        <CashedImage
          uri={item.strMealThumb}
          className="bg-black/20"
          style={{
            width: '100%',
            height: useSmallHeight ? hp(25) : hp(35),
            borderRadius: 35,
          }}
        />
        <Text
          style={{fontSize: hp(1.6)}}
          className="font-semibold ml-2 text-neutral-600">
          {item.strMeal.length > 20
            ? item.strMeal.slice(0, 20) + '...'
            : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

export default RecipeCard;
