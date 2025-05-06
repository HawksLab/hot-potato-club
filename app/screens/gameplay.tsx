import { useGame } from '@/_context/GameContext';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function Gameplay() {
  const { 
    gameState, 
    nextPlayer, 
    skipQuestion, 
    explode,
    resetGame
  } = useGame();
  
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [explosionTime, setExplosionTime] = useState<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const hasExited = useRef(false);

  const pulseAnim = useRef(new Animated.Value(1)).current;

  const startPulseAnimation = useCallback(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.1, duration: 700, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      ])
    ).start();
  }, [pulseAnim]);

  const handleExplosion = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    explode();
    try {
    Alert.alert(
      'BOOM!',
      `The bomb exploded with ${gameState.settings.players[gameState.currentPlayer].name}!`,
      [{ text: 'Continue', onPress: () => {
        setTimeElapsed(0);
        setExplosionTime(null);
        router.push('/screens/round-result');
      }}]
    );
   } catch (error) {
     console.error('Error showing alert:', error);
   }
  }, [explode, gameState.settings.players, gameState.currentPlayer]);

  useEffect(() => {
    if (gameState.timerRunning) {
      // Generate random time once
      if (explosionTime === null) {
        const { minTimer, maxTimer } = gameState.settings;
        setExplosionTime(Math.floor(Math.random() * (maxTimer - minTimer + 1)) + minTimer);
      }
      timerRef.current = setInterval(() => setTimeElapsed(prev => prev + 1), 1000);
      startPulseAnimation();
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [gameState.timerRunning, explosionTime, startPulseAnimation, gameState.settings]);

  useEffect(() => {
    if (explosionTime !== null && timeElapsed >= explosionTime && gameState.timerRunning) {
      handleExplosion();
    }
  }, [timeElapsed, explosionTime, gameState.timerRunning, handleExplosion]);

  const handleNextPlayer = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    nextPlayer();
  };

  const handleSkipQuestion = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    skipQuestion();
  };
  
  const handleExitGame = () => {
    Alert.alert(
      "End Game",
      "Are you sure you want to end the current game?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "End Game", 
          style: "destructive", 
          onPress: () => {
            if (hasExited.current) return;
            hasExited.current = true;
            if (timerRef.current) clearInterval(timerRef.current);
            resetGame();
            router.replace('/home');
          }
        }
      ]
    );
  };

  // Get current player name
  const currentPlayer = gameState.settings.players[gameState.currentPlayer];
  
  // Safety check
  if (!currentPlayer) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Loading game data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <Text style={styles.roundText}>Round {gameState.currentRound}/{gameState.settings.rounds}</Text>
        <TouchableOpacity 
          style={styles.exitButton}
          onPress={handleExitGame}
        >
          <Text style={styles.exitButtonText}>Exit Game</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bombContainer}>
        <Animated.Image 
          source={require('@/assets/images/logo.png')} 
          style={[
            styles.bombImage,
            {
              transform: [{ scale: pulseAnim }]
            }
          ]}
        />
      </View>
      
      <View style={styles.gameplayInfo}>
        <Text style={styles.playerName}>{`${currentPlayer.name}'s turn`}</Text>
        <Text style={styles.categoryText}>{gameState.currentCategory}</Text>
        <Text style={styles.questionText}>{gameState.currentQuestion}</Text>
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.skipButton}
          onPress={handleSkipQuestion}
        >
          <MaterialIcons name="skip-next" size={24} color="#FE6244" />
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.passButton}
          onPress={handleNextPlayer}
        >
          <FontAwesome5 name="hand-holding" size={24} color="white" />
          <Text style={styles.passButtonText}>Pass</Text>
        </TouchableOpacity>
      </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  roundText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'SpaceMono',
  },
  exitButton: {
    padding: 8,
  },
  exitButtonText: {
    color: '#999',
    fontSize: 14,
    fontFamily: 'SpaceMono',
  },
  bombContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  bombImage: {
    width: width * 0.4,
    height: width * 0.4,
    resizeMode: 'contain',
  },
  gameplayInfo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  playerName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FE6244',
    marginBottom: 10,
    fontFamily: 'SpaceMono',
  },
  categoryText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
    fontFamily: 'SpaceMono',
  },
  questionText: {
    fontSize: 24,
    textAlign: 'center',
    marginHorizontal: 20,
    lineHeight: 34,
    fontFamily: 'SpaceMono',
  },
  timerText: {
    position: 'absolute',
    top: -30,
    fontSize: 16,
    color: '#666',
    fontFamily: 'SpaceMono',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  skipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#FE6244',
  },
  skipButtonText: {
    color: '#FE6244',
    fontSize: 16,
    marginLeft: 8,
    fontFamily: 'SpaceMono',
  },
  passButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FE6244',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  passButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
    fontFamily: 'SpaceMono',
  },
  errorText: {
    fontSize: 18, 
    textAlign: 'center',
    marginTop: 40,
    color: '#666',
    fontFamily: 'SpaceMono',
  },
});