import { AntDesign } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
 Image,
 ScrollView,
 StyleSheet,
 Text,
 TouchableOpacity,
 View
} from 'react-native';

export default function HowToPlay() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          router.back();
        }}
      >
        <AntDesign name="arrowleft" size={24} color="#FE6244" />
      </TouchableOpacity>
      
      <Text style={styles.title}>How to Play</Text>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Image 
            source={require('@/assets/images/logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          
          <View style={styles.ruleSection}>
            <Text style={styles.ruleTitle}>Game Overview</Text>
            <Text style={styles.ruleText}>
              Hot Potato Club is a party game where players pass a ticking bomb while answering questions. 
              When the bomb explodes, whoever is holding it loses the round!
            </Text>
          </View>

          <View style={styles.ruleSection}>
            <Text style={styles.ruleTitle}>Game Setup</Text>
            <Text style={styles.ruleText}>
              1. Enter the names of all players (minimum 2){'\n'}
              2. Choose question categories{'\n'}
              3. Set the number of rounds and timer range
            </Text>
          </View>

          <View style={styles.ruleSection}>
            <Text style={styles.ruleTitle}>Gameplay</Text>
            <Text style={styles.ruleText}>
{`• Each round starts with a random player and question
` +
`• The bomb will explode at a random time within your selected range
` +
`• Answer the question and tap "Pass" to give the bomb to the next player
` +
`• Don't like the question? Tap "Skip" for a new one
` +
`• When the bomb explodes, the current player loses the round
` +
`• After completing all rounds, see who won with the fewest explosions!`}
            </Text>
          </View>

          <View style={styles.ruleSection}>
            <Text style={styles.ruleTitle}>Strategy Tips</Text>
            <Text style={styles.ruleText}>
              • Don&apos;t take too long answering or you might explode!{'\n'}
              • Use the &quot;Skip&quot; button wisely if you get a difficult question{'\n'}
              • Be ready to pass quickly after answering{'\n'}
              • Have fun and get creative with your answers!
            </Text>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity 
        style={styles.startButton}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          router.push('/screens/setup-players');
        }}
      >
        <Text style={styles.startButtonText}>{`Let's Play!`}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  backButton: {
    padding: 8,
    marginTop: 40,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'SpaceMono',
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 30,
  },
  ruleSection: {
    marginBottom: 25,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  ruleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'SpaceMono',
    marginBottom: 10,
    color: '#FE6244',
  },
  ruleText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  startButton: {
    backgroundColor: '#FE6244',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'SpaceMono',
  },
});