import { useGame } from '@/_context/GameContext';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function GameSummary() {
  const { gameState, resetGame } = useGame();
  // Use a ref to track if game has been reset already
  const hasReset = useRef(false);

  // Calculate results: how many explosions per player
  const calculateResults = () => {
    // Check if players exist in settings
    if (!gameState.settings.players || gameState.settings.players.length === 0) {
      return [];
    }
    
    const results = gameState.settings.players.map(player => {
      // Count how many times this player had the bomb explode
      const explosions = gameState.roundResults.filter(
        result => result.playerId === player.id && result.exploded
      ).length;
      
      return {
        ...player,
        explosions,
      };
    });
    
    // Sort by explosions (ascending)
    return results.sort((a, b) => a.explosions - b.explosions);
  };

  const results = calculateResults();
  const winner = results.length > 0 ? results[0] : null;

  const handlePlayAgain = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      hasReset.current = true;
      resetGame();
      router.replace('/screens/setup-players');
    } catch (error) {
      console.error('Error in handlePlayAgain:', error);
    }
  };

  const handleMainMenu = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      hasReset.current = true;
      resetGame();
      router.replace('/home');
    } catch (error) {
      console.error('Error in handleMainMenu:', error);
    }
  };

  // If no results, redirect to home
  useEffect(() => {
    if ((results.length === 0 || !winner) && !hasReset.current) {
      hasReset.current = true;
      resetGame();
      router.replace('/home');
    }
  }, []);

  // Don't render if no results
  if (results.length === 0 || !winner) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <Text style={styles.title}>Game Over!</Text>
      <Text style={styles.subtitle}>Final Results</Text>

      {/* Winner section */}
      <View style={styles.winnerContainer}>
        <Text style={styles.winnerTitle}>WINNER!</Text>
        <View style={styles.winnerCard}>
          <FontAwesome5 name="crown" size={32} color="#FFD700" />
          <Text style={styles.winnerName}>{winner.name}</Text>
          <Text style={styles.winnerStats}>
            {winner.explosions === 0 
              ? "Perfect game - no explosions!" 
              : `${winner.explosions} explosion${winner.explosions > 1 ? 's' : ''}`}
          </Text>
        </View>
      </View>

      {/* Results list */}
      <Text style={styles.resultsTitle}>All Players</Text>
      <ScrollView style={styles.resultsContainer}>
        {results.map((player, index) => (
          <View 
            key={player.id} 
            style={[
              styles.resultCard,
              index === 0 ? styles.firstPlace : null
            ]}
          >
            <View style={styles.rankContainer}>
              <Text style={styles.rankText}>{index + 1}</Text>
            </View>
            <Text style={styles.playerName}>{player.name}</Text>
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>
                {player.explosions}
              </Text>
              {player.explosions > 0 && (
                <Image 
                  source={require('@/assets/images/logo.png')} 
                  style={styles.bombIcon}
                />
              )}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Footer buttons */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={handleMainMenu}
        >
          <Text style={styles.menuButtonText}>Main Menu</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.playAgainButton}
          onPress={handlePlayAgain}
        >
          <Text style={styles.playAgainButtonText}>Play Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'SpaceMono',
    marginTop: 40,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  winnerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  winnerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    fontFamily: 'SpaceMono',
    marginBottom: 10,
  },
  winnerCard: {
    backgroundColor: '#FEF9E7',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  winnerName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    fontFamily: 'SpaceMono',
  },
  winnerStats: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'SpaceMono',
    marginBottom: 10,
  },
  resultsContainer: {
    flex: 1,
    marginBottom: 20,
  },
  resultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  firstPlace: {
    backgroundColor: '#FEF9E7',
    borderColor: '#FFD700',
  },
  rankContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#DDD',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  rankText: {
    fontWeight: 'bold',
    color: '#444',
  },
  playerName: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'SpaceMono',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5,
  },
  bombIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  menuButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#FE6244',
  },
  menuButtonText: {
    color: '#FE6244',
    fontSize: 16,
    fontFamily: 'SpaceMono',
  },
  playAgainButton: {
    backgroundColor: '#FE6244',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  playAgainButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'SpaceMono',
  },
});