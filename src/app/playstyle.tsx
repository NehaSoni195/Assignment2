import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const playingStatusData = [
  {
    label: "Looking for Playground",
    value: "playground",
  },
  {
    label: "Looking for Player",
    value: "player",
  },
];

const sportsData = [
  {
    label: "Archery",
    value: "Archery",
  },
  {
    label: "Badminton",
    value: "Badminton",
  },
  {
    label: "Basketball",
    value: "Basketball",
  },
  {
    label: "Boxing",
    value: "Boxing",
  },
  {
    label: "Cricket",
    value: "Cricket",
  },
];

export default function PlayStyle() {
  const params = useLocalSearchParams();

  const [playingStatus, setPlayingStatus] = useState("");
  const [sport, setSport] = useState("");

  const onNext = () => {
    router.push({
      pathname: "/feedback",
      params: {
        ...params,
        playingStatus,
        sport,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Enter your details</Text>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Playing Status</Text>

        <Dropdown
          style={styles.dropdown}
          data={playingStatusData}
          containerStyle={{
            borderColor: "#404040",
            borderWidth: 1,
            borderRadius: 20,
            marginTop: 6,
            overflow: "hidden",
          }}
          labelField="label"
          valueField="value"
          placeholder="Looking for Playground"
          placeholderStyle={styles.placeholder}
          selectedTextStyle={styles.selectedText}
          value={playingStatus}
          onChange={(item) => setPlayingStatus(item.value)}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Sport you like *</Text>

        <Dropdown
          style={styles.dropdown}
          data={sportsData}
          containerStyle={{
            borderColor: "#404040",
            borderWidth: 1,
            borderRadius: 20,
            marginTop: 6,
            overflow: "hidden",
          }}
          labelField="label"
          valueField="value"
          placeholder="Basketball"
          placeholderStyle={styles.placeholder}
          selectedTextStyle={styles.selectedText}
          value={sport}
          onChange={(item) => setSport(item.value)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={onNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1C1E",
    paddingHorizontal: 20,
  },

  title: {
    color: "#fff",
    textAlign: "center",
    marginTop: 24,
    marginBottom: 40,
    fontSize: 20,
    fontWeight: "500",
  },

  fieldContainer: {
    marginBottom: 25,
  },

  label: {
    color: "#fff",
    fontSize: 12,
    marginBottom: 8,
  },

  dropdown: {
    height: 46,
    borderWidth: 1,
    borderColor: "#404040",
    borderRadius: 6,
    paddingHorizontal: 12,
    backgroundColor: "#1C1C1E",
  },

  placeholder: {
    color: "#808080",
    fontSize: 13,
  },

  selectedText: {
    color: "#fff",
    fontSize: 13,
  },

  button: {
    position: "absolute",
    bottom: 35,
    left: 20,
    right: 20,
    height: 48,
    backgroundColor: "#2496FF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
