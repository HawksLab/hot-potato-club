import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import * as MailComposer from 'expo-mail-composer';
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
  View,
} from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function Feedback() {
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitFeedback = async () => {
    if (!feedback.trim()) {
      Alert.alert('Oops!', 'Please enter your feedback before submitting.');
      return;
    }

    setIsSubmitting(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      const isAvailable = await MailComposer.isAvailableAsync();

      if (!isAvailable) {
        Alert.alert(
          'Email Not Available',
          `Please set up an email account on your device to send feedback, or contact us directly at abhinavgupta4505@gmail.com\n\nYour feedback:\n${feedback}`
        );
        setIsSubmitting(false);
        return;
      }

      const emailBody = `Feedback from Hot Potato Club App:

${feedback}

${email ? `Contact Email: ${email}` : 'No contact email provided'}

---
Sent from Hot Potato Club Mobile App`;

      const result = await MailComposer.composeAsync({
        recipients: ['abhinavgupta4505@gmail.com'],
        subject: 'Hot Potato Club - User Feedback',
        body: emailBody,
      });

      if (result.status === 'sent') {
        Alert.alert(
          'Thank You!',
          'Your feedback has been sent successfully! We appreciate you taking the time to help us improve Hot Potato Club.',
          [
            {
              text: 'OK',
              onPress: () => router.back(),
            },
          ]
        );
      } else if (result.status === 'saved') {
        Alert.alert(
          'Feedback Saved!',
          'Your feedback has been saved as a draft. Please send it when you\'re ready!',
          [
            {
              text: 'OK',
              onPress: () => router.back(),
            },
          ]
        );
      } else if (result.status === 'cancelled') {
        // User cancelled, just reset the state
        setIsSubmitting(false);
        return;
      }
    } catch (error) {
      console.error('Error sending feedback:', error);
      Alert.alert(
        'Error',
        'Something went wrong while preparing your feedback email. Please try again or contact us directly at abhinavgupta4505@gmail.com'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="dark" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            router.back();
          }}
        >
          <Ionicons name="arrow-back" size={24} color="#FE6244" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Feedback</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeIn.duration(800)}>
          <Text style={styles.title}>We'd Love Your Feedback!</Text>
          <Text style={styles.subtitle}>
            Help us make Hot Potato Club even better. Share your thoughts, suggestions, or report any bugs you've encountered.
          </Text>

          <View style={styles.form}>
            <Text style={styles.label}>Your Feedback *</Text>
            <TextInput
              style={styles.textArea}
              multiline
              numberOfLines={6}
              placeholder="Tell us what you think! Ideas for new features, things you love, or anything that's not working quite right..."
              value={feedback}
              onChangeText={setFeedback}
              maxLength={1000}
              textAlignVertical="top"
            />

            <Text style={styles.label}>Your Email (Optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="your.email@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Text style={styles.helperText}>
              Only provide your email if you'd like us to follow up with you about your feedback.
            </Text>

            <TouchableOpacity
              style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
              onPress={handleSubmitFeedback}
              disabled={isSubmitting}
            >
              <Text style={styles.submitButtonText}>
                {isSubmitting ? 'Preparing Email...' : 'Send Feedback'}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 8,
    width: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'SpaceMono',
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'SpaceMono',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'SpaceMono',
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
    lineHeight: 24,
  },
  form: {
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    fontFamily: 'SpaceMono',
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    fontFamily: 'SpaceMono',
    marginBottom: 15,
    backgroundColor: '#F9F9F9',
  },
  textArea: {
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    fontFamily: 'SpaceMono',
    marginBottom: 15,
    backgroundColor: '#F9F9F9',
    minHeight: 120,
  },
  helperText: {
    fontSize: 12,
    fontFamily: 'SpaceMono',
    color: '#999',
    marginBottom: 25,
    marginTop: -10,
  },
  submitButton: {
    backgroundColor: '#FE6244',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButtonDisabled: {
    backgroundColor: '#CCC',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'SpaceMono',
    fontWeight: 'bold',
  },
}); 