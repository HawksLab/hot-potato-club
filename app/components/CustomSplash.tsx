import { Image, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

export default function CustomSplash() {
  return (
    <View style={styles.container}>
      <Animated.View 
        entering={FadeIn.duration(1000)}
        style={styles.imageContainer}
      >
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </Animated.View>
      <Animated.Text 
        entering={FadeInDown.duration(1000).delay(500)}
        style={styles.tagline}
      >
        Pass. Play. Don&apos;t explode
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  tagline: {
    marginTop: 20,
    fontSize: 24,
    fontFamily: 'SpaceMono',
    textAlign: 'center',
    color: '#000',
  },
});