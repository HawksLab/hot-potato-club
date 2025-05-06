import { useGame } from '@/_context/GameContext';
import { Player } from '@/_types/GameTypes';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
 Alert,
 KeyboardAvoidingView,
 Platform,
 ScrollView,
 StyleSheet,
 Text,
 TextInput,
 TouchableOpacity,
 View
} from 'react-native';

export default function SetupPlayers() {
  const { setPlayers } = useGame();
  const [playerNames, setPlayerNames] = useState<string[]>(['', '']);
  
  const addPlayerField = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setPlayerNames([...playerNames, '']);
  };
  
  const removePlayerField = (index: number) => {
    if (playerNames.length <= 2) {
      Alert.alert('Error', 'You need at least 2 players!');
      return;
    }
    
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const updatedPlayers = [...playerNames];
    updatedPlayers.splice(index, 1);
    setPlayerNames(updatedPlayers);
  };
  
  const updatePlayerName = (text: string, index: number) => {
    const updatedPlayers = [...playerNames];
    updatedPlayers[index] = text;
    setPlayerNames(updatedPlayers);
  };
  
  const handleNext = () => {
    // Validate player names
    const emptyNameIndex = playerNames.findIndex(name => !name.trim());
    if (emptyNameIndex !== -1) {
      Alert.alert('Missing Name', `Please enter a name for Player ${emptyNameIndex + 1}`);
      return;
    }
    
    // Check for duplicate names
    const uniqueNames = new Set(playerNames.map(name => name.trim()));
    if (uniqueNames.size !== playerNames.length) {
      Alert.alert('Duplicate Names', 'All players must have unique names!');
      return;
    }
    
    // Create player objects with IDs and save to context
    const players: Player[] = playerNames.map((name, index) => ({
      id: `player-${index + 1}`,
      name: name.trim(),
    }));
    
    setPlayers(players);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push('/screens/select-categories');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <StatusBar style="auto" />
        
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <AntDesign name="arrowleft" size={24} color="#FE6244" />
          </TouchableOpacity>
          
          <Text style={styles.title}>{`Who's Playing?`}</Text>
          <Text style={styles.subtitle}>Enter player names (minimum 2)</Text>
          
          {playerNames.map((name, index) => (
            <View key={index} style={styles.inputRow}>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={(text) => updatePlayerName(text, index)}
                placeholder={`Player ${index + 1}`}
                placeholderTextColor="#AAA"
                autoComplete="off"
                autoCapitalize="words"
              />
              {index >= 2 && (
                <TouchableOpacity 
                  style={styles.removeButton}
                  onPress={() => removePlayerField(index)}
                >
                  <AntDesign name="close" size={18} color="white" />
                </TouchableOpacity>
              )}
            </View>
          ))}
          
          {playerNames.length < 8 && (
            <TouchableOpacity 
              style={styles.addPlayerButton} 
              onPress={addPlayerField}
            >
              <AntDesign name="plus" size={16} color="#FE6244" />
              <Text style={styles.addPlayerText}>Add Player</Text>
            </TouchableOpacity>
          )}
          
          <View style={styles.footer}>
            <TouchableOpacity 
              style={styles.nextButton}
              onPress={handleNext}
            >
              <Text style={styles.nextButtonText}>Next</Text>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
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
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    height: 55,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#F9F9F9',
  },
  removeButton: {
    width: 30,
    height: 30,
    backgroundColor: '#FF6B6B',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  addPlayerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
  },
  addPlayerText: {
    color: '#FE6244',
    fontSize: 16,
    marginLeft: 5,
    fontFamily: 'SpaceMono',
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  nextButton: {
    backgroundColor: '#FE6244',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'SpaceMono',
    marginRight: 5,
  },
});