import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function Home() {
  const navigateTo = (path: "/screens/setup-players" | "/screens/how-to-play") => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push(path);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <Animated.View 
        entering={FadeIn.duration(1000)}
        style={styles.logoContainer}
      >
        <Image 
          source={require('@/assets/images/logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Hot Potato Club</Text>
        <Text style={styles.subtitle}>Pass. Play. Don&apos;t explode!</Text>
      </Animated.View>

      <Animated.View 
        entering={FadeIn.duration(1000).delay(300)}
        style={styles.buttonsContainer}
      >
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigateTo('/screens/setup-players')}
        >
          <Text style={styles.buttonText}>New Game</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.secondaryButton]} 
          onPress={() => navigateTo('/screens/how-to-play')}
        >
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>How to Play</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'SpaceMono',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    fontFamily: 'SpaceMono',
    textAlign: 'center',
  },
  buttonsContainer: {
    width: '100%',
    maxWidth: 300,
  },
  button: {
    backgroundColor: '#FE6244',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FE6244',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'SpaceMono',
  },
  secondaryButtonText: {
    color: '#FE6244',
  },
});