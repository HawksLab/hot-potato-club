import { useGame } from '@/_context/GameContext';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef } from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';

export default function RoundResult() {
  const { gameState, nextRound, resetGame } = useGame();
  const hasNavigated = useRef(false);
  
  // Get the player who was holding the bomb when it exploded
  const lastResult = gameState.roundResults[gameState.roundResults.length - 1];
  const explodedPlayer = gameState.settings.players.find(player => player.id === lastResult?.playerId);
  
  // Check if this was the last round
  const isLastRound = gameState.currentRound >= gameState.settings.rounds;
  
  useEffect(() => {
    // If game is over, redirect to game summary screen
    if (gameState.gameOver && !hasNavigated.current) {
      hasNavigated.current = true;
      // Use a small delay to ensure the state update has completed
      setTimeout(() => {
        router.push('/screens/game-summary');
      }, 100);
    }
  }, [gameState.gameOver]);

  const handleNext = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      
      if (isLastRound) {
        // End the game and move to summary directly
        hasNavigated.current = true;
        nextRound(); // This sets gameOver to true
        // Navigate immediately rather than waiting for effect
        setTimeout(() => {
          router.push('/screens/game-summary');
        }, 100);
      } else {
        // Move to the next round
        hasNavigated.current = true;
        nextRound();
        router.replace('/screens/gameplay');
      }
    } catch (error) {
      console.error('Error in handleNext:', error);
    }
  };
  
  const handleQuit = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      hasNavigated.current = true;
      resetGame();
      router.replace('/home');
    } catch (error) {
      console.error('Error in handleQuit:', error);
    }
  };

  // Validate data is available
  if (!explodedPlayer || !gameState.settings.rounds) {
    // Handle invalid state
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Loading game data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <Animated.View 
        style={styles.content}
        entering={FadeIn.duration(500)}
      >
        <Text style={styles.roundText}>Round {gameState.currentRound} Result</Text>
        
        <Animated.View
          style={styles.resultContainer}
          entering={FadeInUp.duration(800).delay(300)}
        >
          <Image 
            source={require('@/assets/images/logo.png')} 
            style={styles.bombImage}
          />
          
          <Text style={styles.boomText}>BOOM!</Text>
          
          <View style={styles.playerCard}>
            <FontAwesome5 name="sad-tear" size={32} color="#FE6244" style={styles.icon} />
            <Text style={styles.resultText}>
              {explodedPlayer.name} lost this round!
            </Text>
          </View>
        </Animated.View>
      
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.quitButton}
            onPress={handleQuit}
          >
            <Text style={styles.quitButtonText}>Quit Game</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>
              {isLastRound ? 'See Results' : 'Next Round'}
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  roundText: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'SpaceMono',
    marginBottom: 40,
  },
  resultContainer: {
    alignItems: 'center',
    marginVertical: 30,
    width: '100%',
  },
  bombImage: {
    width: width * 0.3,
    height: width * 0.3,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  boomText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FE6244',
    fontFamily: 'SpaceMono',
    marginBottom: 30,
  },
  playerCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
    marginBottom: 30,
  },
  icon: {
    marginBottom: 15,
  },
  resultText: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'SpaceMono',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 'auto',
    paddingBottom: 20,
  },
  quitButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#999',
  },
  quitButtonText: {
    color: '#666',
    fontSize: 16,
    fontFamily: 'SpaceMono',
  },
  nextButton: {
    backgroundColor: '#FE6244',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'SpaceMono',
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
    color: '#666',
    fontFamily: 'SpaceMono',
  }
});