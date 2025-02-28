import React from 'react';
import {ScrollView, StatusBar, TouchableOpacity, View} from 'react-native';
import CashedImage from '../helpers/Image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {HeartIcon} from 'react-native-heroicons/solid';

const RecipeDetailsScreen = props => {
  let item = props.route.params;
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
            <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
          </TouchableOpacity>

          <TouchableOpacity className="p-2 rounded-full bg-white">
            <HeartIcon size={hp(3.5)} strokeWidth={4.5} color="gray" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content Container */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: 30}}>
      </ScrollView>
    </View>
  );
};

export default RecipeDetailsScreen;
