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
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
  const [showCountdown, setShowCountdown] = useState(true);
  const [countdownValue, setCountdownValue] = useState(3);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hasExited = useRef(false);
  const insets = useSafeAreaInsets();

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const countdownScaleAnim = useRef(new Animated.Value(0.3)).current;
  const countdownOpacityAnim = useRef(new Animated.Value(0)).current;

  // Animation for the countdown numbers
  const animateCountdown = useCallback(() => {
    countdownScaleAnim.setValue(0.3);
    countdownOpacityAnim.setValue(0);
    
    Animated.parallel([
      Animated.timing(countdownScaleAnim, {
        toValue: 1.2,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(countdownOpacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(countdownOpacityAnim, {
          toValue: 0,
          duration: 600,
          delay: 200,
          useNativeDriver: true,
        })
      ])
    ]).start();

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }, [countdownScaleAnim, countdownOpacityAnim]);

  // Start pulse animation for the bomb
  const startPulseAnimation = useCallback(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.1, duration: 700, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      ])
    ).start();
  }, [pulseAnim]);

  // Generate random explosion time
  const generateExplosionTime = useCallback(() => {
    const { minTimer, maxTimer } = gameState.settings;
    const newExplosionTime = Math.floor(Math.random() * (maxTimer - minTimer + 1)) + minTimer;
    return newExplosionTime;
  }, [gameState.settings]);

  // Start the game timer
  const startGameTimer = useCallback(() => {
    // Clear any existing timer first
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Reset the elapsed time
    setTimeElapsed(0);
    
    // Generate a new random explosion time
    const newExplosionTime = generateExplosionTime();
    setExplosionTime(newExplosionTime);
    
    // Start the timer that updates every second
    timerRef.current = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000) as unknown as NodeJS.Timeout;
    
    // Start the bomb pulsing animation
    startPulseAnimation();
  }, [generateExplosionTime, startPulseAnimation]);

  // Run the countdown timer when component mounts
  useEffect(() => {
    if (showCountdown) {
      animateCountdown();
      
      countdownTimerRef.current = setInterval(() => {
        setCountdownValue(prev => {
          const newValue = prev - 1;
          if (newValue <= 0) {
            // When countdown ends
            if (countdownTimerRef.current) {
              clearInterval(countdownTimerRef.current);
            }
            setShowCountdown(false);
            
            // Start the game timer after countdown ends if game is running
            if (gameState.timerRunning) {
              startGameTimer();
            }
            
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            return 0;
          }
          animateCountdown();
          return newValue;
        });
      }, 1000) as unknown as NodeJS.Timeout;
      
      return () => {
        if (countdownTimerRef.current) {
          clearInterval(countdownTimerRef.current);
        }
      };
    }
  }, [showCountdown, animateCountdown, gameState.timerRunning, startGameTimer]);

  // Check for explosion based on timeElapsed
  useEffect(() => {
    if (explosionTime !== null && timeElapsed >= explosionTime && gameState.timerRunning && !showCountdown) {
      handleExplosion();
    }
  }, [timeElapsed, explosionTime, gameState.timerRunning, showCountdown]);

  const handleExplosion = useCallback(() => {
    // Stop the timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
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
            if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
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
      
      {showCountdown ? (
        <View style={[styles.countdownOverlay, { paddingTop: insets.top }]}>
          <View style={styles.countdownContent}>
            <Text style={styles.getReadyText}>
              Get Ready {currentPlayer.name}!
            </Text>
            <Animated.Text
              style={[
                styles.countdownNumber,
                {
                  opacity: countdownOpacityAnim,
                  transform: [{ scale: countdownScaleAnim }]
                }
              ]}
            >
              {countdownValue}
            </Animated.Text>
            <Text style={styles.startingPlayerText}>
              You&apos;re starting Round {gameState.currentRound}
            </Text>
          </View>
        </View>
      ) : (
        <>
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
        </>
      )}
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
  countdownOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countdownContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  countdownNumber: {
    fontSize: 150,
    fontWeight: 'bold',
    color: '#FE6244',
    fontFamily: 'SpaceMono',
    marginVertical: 40,
  },
  getReadyText: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'SpaceMono',
    textAlign: 'center',
    marginBottom: 30,
  },
  startingPlayerText: {
    fontSize: 20,
    fontFamily: 'SpaceMono',
    textAlign: 'center',
    color: '#666',
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