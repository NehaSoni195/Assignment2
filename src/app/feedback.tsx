import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function FeedbackScreen() {
  const params = useLocalSearchParams();

  const [feedback, setFeedback] = useState("");

  const onSubmit = () => {
    router.push({
      pathname: "/profile",
      params: {
        ...params,
        feedback,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Share Your Feedback</Text>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Feedback</Text>

        <TextInput
          multiline
          maxLength={1000}
          placeholder="Write your suggestion"
          placeholderTextColor="#6B6B6B"
          value={feedback}
          onChangeText={setFeedback}
          style={styles.input}
        />

        <Text style={styles.counter}>{feedback.length}/1000</Text>
      </View>

      <TouchableOpacity
        disabled={!feedback.trim()}
        style={[
          styles.button,
          {
            backgroundColor: feedback.trim() ? "#2496FF" : "#2B2B2B",
          },
        ]}
        onPress={onSubmit}
      >
        <Text
          style={[
            styles.buttonText,
            {
              color: feedback.trim() ? "#FFF" : "#6E6E6E",
            },
          ]}
        >
          Submit
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F2023",
    paddingHorizontal: 20,
  },

  title: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
    marginTop: 26,
    marginBottom: 30,
  },

  fieldContainer: {
    marginTop: 10,
  },

  label: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 12,
  },

  input: {
    height: 300,
    borderWidth: 1,
    borderColor: "#424242",
    borderRadius: 12,
    color: "#fff",
    paddingHorizontal: 12,
    paddingTop: 12,
    fontSize: 12,
    textAlignVertical: "top",
  },

  counter: {
    color: "#CFCFCF",
    fontSize: 10,
    alignSelf: "flex-end",
    marginTop: 4,
  },

  button: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 28,
    height: 42,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    fontSize: 12,
    fontWeight: "500",
  },
});
