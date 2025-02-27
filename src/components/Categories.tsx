import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Animated, {FadeInDown} from 'react-native-reanimated';

const Categories = ({activeCategory, setActiveCategory, categories}) => {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()} className='mt-6'>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{paddingHorizontal: 15}}>
        {categories.map((category, index) => {
          let isActive = category.strCategory === activeCategory;
          let activeButtonClass = isActive
            ? ' bg-amber-400'
            : ' bg-black/10';
          return (
            <TouchableOpacity
              key={index}
              onPress={() => setActiveCategory(category.strCategory)}
              className="flex items-center space-y-1 mx-2">
              <View className={`rounded-full p-[6px] ${activeButtonClass}`}>
                <Image
                  source={{uri: category.strCategoryThumb}}
                  style={{width: hp(6), height: hp(6)}}
                  className="rounded-full"
                />
              </View>
              <Text className="text-neutral-600" style={{fontSize: hp(1.6)}}>
                {category.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
};

export default Categories;
