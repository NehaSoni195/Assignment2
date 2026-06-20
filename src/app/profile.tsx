import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

export default function SummaryScreen() {
  const params = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Your details</Text>

        <View style={styles.section}>
          <Text style={styles.heading}>Name</Text>
          <Text style={styles.value}>{params.name}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Address</Text>
          <Text style={styles.value}>{params.address}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Pin Code</Text>
          <Text style={styles.value}>{params.pincode}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Playing Status</Text>
          <Text style={styles.value}>{params.playingStatus}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Sport you like</Text>
          <Text style={styles.value}>{params.sport}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Feedback</Text>
          <Text style={styles.feedback}>{params.feedback}</Text>
        </View>
      </ScrollView>
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

  section: {
    marginBottom: 18,
  },

  heading: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 5,
  },

  value: {
    color: "#D8D8D8",
    fontSize: 14,
  },

  feedback: {
    color: "#D8D8D8",
    fontSize: 14,
    lineHeight: 20,
  },
});
