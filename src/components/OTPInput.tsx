import { StyleSheet, Text } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

type Props = {
  value: string;
  setValue: (value: string) => void;
  error?: boolean;
};

const CELL_COUNT = 4;

export default function OTPInput({ value, setValue, error = false }: Props) {
  const ref = useBlurOnFulfill({
    value,
    cellCount: CELL_COUNT,
  });

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <CodeField
      ref={ref}
      {...props}
      value={value}
      onChangeText={setValue}
      cellCount={CELL_COUNT}
      rootStyle={styles.codeFieldRoot}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      autoComplete="sms-otp"
      renderCell={({ index, symbol, isFocused }) => (
        <Text
          key={index}
          style={[
            styles.cell,
            isFocused && styles.focusCell,
            error && styles.errorCell,
          ]}
          onLayout={getCellOnLayoutHandler(index)}
        >
          {symbol || (isFocused ? <Cursor /> : null)}
        </Text>
      )}
    />
  );
}

const styles = StyleSheet.create({
  codeFieldRoot: {
    width: 180,
  },

  cell: {
    width: 44,
    height: 44,
    lineHeight: 34,
    textAlign: "center",
    marginHorizontal: 4,

    borderWidth: 1,
    borderColor: "#5A5A5A",

    borderRadius: 4,

    color: "#FFFFFF",

    fontSize: 22,
    fontWeight: "500",

    backgroundColor: "transparent",
  },

  focusCell: {
    borderColor: "#FFFFFF",
    alignItems: "center",
  },

  errorCell: {
    borderColor: "#FF4D4F",
  },
});
