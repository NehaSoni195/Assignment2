import { StyleSheet, Text, TextInput, View } from "react-native";
import { COLORS } from "../constants/colors";

type Props = {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: any;
  error?: string;
  placeholder?: string;
};

export default function AppInput({
  label,
  value,
  onChangeText,
  keyboardType,
  error,
  placeholder,
}: Props) {
  return (
    <View style={{ marginBottom: 20 }}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor={COLORS.grey}
        style={[
          styles.input,
          error && {
            borderColor: COLORS.error,
          },
        ]}
      />

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: COLORS.white,
    marginBottom: 8,
    fontSize: 14,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    paddingHorizontal: 15,
    color: COLORS.white,
    fontSize: 16,
    backgroundColor: COLORS.card,
  },

  error: {
    color: COLORS.error,
    marginTop: 5,
  },
});
