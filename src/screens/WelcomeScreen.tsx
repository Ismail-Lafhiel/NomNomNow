import {Image, StatusBar, Text, View} from 'react-native';

const WelcomeScreen = () => {
  return (
    <View className="flex-1 items-center justify-center space-y-10 bg-yellow-500">
      <StatusBar barStyle="light-content" />

      <View className="bg-white/20 rounded-full p-10">
        <View className="bg-white/20 rounded-full p-8">
        <Image source={require('../assets/images/Los_Pollos_Hermanos_logo.png')} style={{width: 200, height: 200}} />
        </View>
      </View>
    </View>
  );
};

export default WelcomeScreen;
