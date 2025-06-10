import { useGame } from '@/_context/GameContext';
import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SelectLoser() {
  const { gameState, setRoundLoser } = useGame();
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);
  const insets = useSafeAreaInsets();

  const handlePlayerSelect = (playerIndex: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSelectedPlayer(playerIndex);
  };

  const handleConfirmSelection = () => {
    if (selectedPlayer === null) {
      Alert.alert('No Player Selected', 'Please select which player was holding the bomb when it exploded.');
      return;
    }

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    
    // Set the loser for this round
    setRoundLoser(selectedPlayer);
    
    // Navigate to round result
    router.push('/screens/round-result');
  };

  const handleGoBack = () => {
    Alert.alert(
      "Go Back?",
      "Are you sure you want to go back? You'll need to play this round again.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Go Back", 
          onPress: () => router.back()
        }
      ]
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#666" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Who Lost?</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>💥 BOOM!</Text>
        <Text style={styles.subtitle}>
          Round {gameState.currentRound} has ended.{'\n'}
          Select which player was holding the bomb when it exploded:
        </Text>

        <ScrollView style={styles.playersList} showsVerticalScrollIndicator={false}>
          {gameState.settings.players.map((player, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.playerButton,
                selectedPlayer === index && styles.playerButtonSelected
              ]}
              onPress={() => handlePlayerSelect(index)}
            >
              <View style={styles.playerInfo}>
                <View style={[
                  styles.playerAvatar,
                  { backgroundColor: player.color },
                  selectedPlayer === index && styles.playerAvatarSelected
                ]}>
                  <Text style={[
                    styles.playerAvatarText,
                    selectedPlayer === index && styles.playerAvatarTextSelected
                  ]}>
                    {player.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View style={styles.playerDetails}>
                  <Text style={[
                    styles.playerName,
                    selectedPlayer === index && styles.playerNameSelected
                  ]}>
                    {player.name}
                  </Text>
                </View>
              </View>
              {selectedPlayer === index && (
                <MaterialIcons name="check-circle" size={24} color="#FE6244" />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity
          style={[
            styles.confirmButton,
            selectedPlayer === null && styles.confirmButtonDisabled
          ]}
          onPress={handleConfirmSelection}
          disabled={selectedPlayer === null}
        >
          <Text style={[
            styles.confirmButtonText,
            selectedPlayer === null && styles.confirmButtonTextDisabled
          ]}>
            Confirm Selection
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'SpaceMono',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 26,
    color: '#666',
    fontFamily: 'SpaceMono',
  },
  playersList: {
    flex: 1,
    marginBottom: 20,
  },
  playerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#f0f0f0',
    backgroundColor: 'white',
  },
  playerButtonSelected: {
    borderColor: '#FE6244',
    backgroundColor: '#fff5f4',
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  playerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  playerAvatarSelected: {
    borderWidth: 2,
    borderColor: '#FE6244',
  },
  playerAvatarText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'SpaceMono',
  },
  playerAvatarTextSelected: {
    color: 'white',
  },
  playerDetails: {
    flex: 1,
  },
  playerName: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'SpaceMono',
  },
  playerNameSelected: {
    color: '#FE6244',
  },
  confirmButton: {
    backgroundColor: '#FE6244',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    backgroundColor: '#ccc',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'SpaceMono',
  },
  confirmButtonTextDisabled: {
    color: '#999',
  },
}); 