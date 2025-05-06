import { useGame } from '@/_context/GameContext';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
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

export default function SelectCategories() {
  const { categories, setSelectedCategories } = useGame();
  const [selected, setSelected] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    if (selected.includes(categoryId)) {
      setSelected(selected.filter(id => id !== categoryId));
    } else {
      setSelected([...selected, categoryId]);
    }
  };

  const handleNext = () => {
    if (selected.length === 0) {
      Alert.alert('Error', 'Please select at least one category');
      return;
    }

    setSelectedCategories(selected);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push('/screens/game-settings');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <AntDesign name="arrowleft" size={24} color="#FE6244" />
      </TouchableOpacity>
      
      <Text style={styles.title}>Select Categories</Text>
      <Text style={styles.subtitle}>Choose which question categories to include</Text>
      
      <ScrollView style={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryCard,
              selected.includes(category.id) && styles.selectedCategory
            ]}
            onPress={() => toggleCategory(category.id)}
          >
            <Text style={[
              styles.categoryName,
              selected.includes(category.id) && styles.selectedCategoryText
            ]}>
              {category.name || 'Unknown Category'}
            </Text>
            {selected.includes(category.id) && (
              <AntDesign name="check" size={20} color="white" />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <View style={styles.footer}>
        <Text style={styles.selectionCount}>
          {selected.length} {selected.length === 1 ? 'category' : 'categories'} selected
        </Text>
        <TouchableOpacity 
          style={styles.nextButton}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>Next</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="white" />
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
  categoriesContainer: {
    flex: 1,
    marginBottom: 20,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9F9F9',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  selectedCategory: {
    backgroundColor: '#FE6244',
    borderColor: '#FE6244',
  },
  categoryName: {
    fontSize: 18,
    fontFamily: 'SpaceMono',
    color: '#333',
  },
  selectedCategoryText: {
    color: 'white',
  },
  footer: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  selectionCount: {
    marginBottom: 15,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
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