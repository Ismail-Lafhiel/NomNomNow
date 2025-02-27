import {Image, StatusBar, Text, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Animated, {useSharedValue, withSpring} from 'react-native-reanimated';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const WelcomeScreen = () => {
  const ringPadding1 = useSharedValue(0);
  const ringPadding2 = useSharedValue(0);

  const navigation = useNavigation();

  useEffect(() => {
    ringPadding1.value = 0;
    ringPadding2.value = 0;
    setTimeout(
      () => (ringPadding1.value = withSpring(ringPadding1.value + hp(5))),
      100,
    );
    setTimeout(
      () => (ringPadding2.value = withSpring(ringPadding2.value + hp(5.5))),
      300,
    );

    setTimeout(() => navigation.navigate('Home'), 2500);
  }, []);

  return (
    <View className="flex-1 items-center justify-center space-y-10 bg-yellow-500">
      <StatusBar barStyle="light-content" />

      <Animated.View
        className="bg-white/20 rounded-full"
        style={{padding: ringPadding2}}>
        <Animated.View
          className="bg-white/20 rounded-full"
          style={{padding: ringPadding1}}>
          <Image
            source={require('../assets/images/Los_Pollos_Hermanos_logo.png')}
            style={{width: hp(20), height: hp(20)}}
          />
        </Animated.View>
      </Animated.View>
      {/* title */}
      <View className="flex items-center space-y-2 mt-6">
        <Text
          style={{fontSize: hp(6)}}
          className="font-burrito text-white tracking-widest text-center">
          Los Pollos Hermanos
        </Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;
