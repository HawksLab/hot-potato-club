import { useGame } from '@/_context/GameContext';
import { AntDesign } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function GameSettings() {
  const { gameState, setRoundCount, setTimerRange, startGame } = useGame();
  
  const [rounds, setRounds] = useState(gameState.settings.rounds);
  const [minTimer, setMinTimer] = useState(gameState.settings.minTimer);
  const [maxTimer, setMaxTimer] = useState(gameState.settings.maxTimer);

  const formatTime = (seconds: number) => {
    return `${seconds} sec`;
  };

  const handleStartGame = () => {
    // Save settings to context
    setRoundCount(rounds);
    setTimerRange(minTimer, maxTimer);
    
    // Start the game
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    startGame();
    router.replace('/screens/gameplay');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <AntDesign name="arrowleft" size={24} color="#FE6244" />
      </TouchableOpacity>
      
      <Text style={styles.title}>Game Settings</Text>
      <Text style={styles.subtitle}>Configure your game</Text>
      
      <View style={styles.settingCard}>
        <Text style={styles.settingTitle}>Number of Rounds</Text>
        <Text style={styles.settingValue}>{rounds}</Text>
        <Slider
          style={styles.slider}
          value={rounds}
          minimumValue={1}
          maximumValue={10}
          step={1}
          minimumTrackTintColor="#FE6244"
          maximumTrackTintColor="#D1D1D1"
          thumbTintColor="#FE6244"
          onValueChange={(value: number) => {
            Haptics.selectionAsync();
            setRounds(value);
          }}
        />
        <View style={styles.rangeLabels}>
          <Text style={styles.rangeLabel}>1</Text>
          <Text style={styles.rangeLabel}>10</Text>
        </View>
      </View>
      
      <View style={styles.settingCard}>
        <Text style={styles.settingTitle}>Timer Range</Text>
        <Text style={styles.settingValue}>
          {formatTime(minTimer)} - {formatTime(maxTimer)}
        </Text>
        <Text style={styles.settingDescription}>
          The bomb will randomly explode within this time range
        </Text>
        
        <Text style={styles.rangeTitle}>Minimum time before explosion:</Text>
        <Slider
          style={styles.slider}
          value={minTimer}
          minimumValue={5}
          maximumValue={30}
          step={1}
          minimumTrackTintColor="#FE6244"
          maximumTrackTintColor="#D1D1D1"
          thumbTintColor="#FE6244"
          onValueChange={(value: number) => {
            Haptics.selectionAsync();
            const newValue = Math.min(value, maxTimer - 5);
            setMinTimer(newValue);
          }}
        />
        <View style={styles.rangeLabels}>
          <Text style={styles.rangeLabel}>5s</Text>
          <Text style={styles.rangeLabel}>30s</Text>
        </View>
        
        <Text style={styles.rangeTitle}>Maximum time before explosion:</Text>
        <Slider
          style={styles.slider}
          value={maxTimer}
          minimumValue={20}
          maximumValue={120}
          step={1}
          minimumTrackTintColor="#FE6244"
          maximumTrackTintColor="#D1D1D1"
          thumbTintColor="#FE6244"
          onValueChange={(value: number) => {
            Haptics.selectionAsync();
            const newValue = Math.max(value, minTimer + 5);
            setMaxTimer(newValue);
          }}
        />
        <View style={styles.rangeLabels}>
          <Text style={styles.rangeLabel}>20s</Text>
          <Text style={styles.rangeLabel}>120s</Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.startButton}
          onPress={handleStartGame}
        >
          <Text style={styles.startButtonText}>Start Game!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  backButton: {
    padding: 8,
    marginTop: 40,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'SpaceMono',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  settingCard: {
    backgroundColor: '#F9F9F9',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  settingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  settingValue: {
    fontSize: 24,
    color: '#FE6244',
    marginBottom: 5,
    fontFamily: 'SpaceMono',
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  rangeTitle: {
    fontSize: 16,
    marginTop: 15,
    marginBottom: 5,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  rangeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -15,
  },
  rangeLabel: {
    fontSize: 12,
    color: '#666',
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  startButton: {
    backgroundColor: '#FE6244',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'SpaceMono',
  },
});