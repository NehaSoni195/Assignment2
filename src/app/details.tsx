import { router } from "expo-router";
import { Controller, useForm, useWatch } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";
import AppInput from "../components/AppInput";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  address: z.string().min(5, "Address is required"),
  pincode: z.string().length(6, "Enter valid pin code"),
});

type FormData = z.infer<typeof schema>;

const formResolver = async (values: FormData) => {
  const result = schema.safeParse(values);

  if (result.success) {
    return {
      values: result.data,
      errors: {},
    };
  }

  const errors = Object.entries(result.error.formErrors.fieldErrors).reduce(
    (acc, [key, messages]) => {
      if (messages?.length) {
        acc[key] = {
          type: "validation",
          message: messages[0],
        };
      }
      return acc;
    },
    {} as Record<string, { type: string; message: string }>,
  );

  return {
    values: {},
    errors,
  };
};

export default function Details() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: formResolver,
    defaultValues: {
      name: "",
      address: "",
      pincode: "",
    },
  });

  const name = useWatch({
    control,
    name: "name",
  });

  const address = useWatch({
    control,
    name: "address",
  });

  const pincode = useWatch({
    control,
    name: "pincode",
  });

  const isFilled = name?.trim() && address?.trim() && pincode?.trim();

  const onSubmit = (data: FormData) => {
    router.push({
      pathname: "/playstyle",
      params: data,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>Enter your details</Text>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.formContainer}
          >
            {/* NAME */}
            <Text style={styles.label}>Name*</Text>

            <Controller
              control={control}
              name="name"
              render={({ field: { value, onChange } }) => (
                <>
                  <AppInput
                    placeholder="ABC"
                    value={value}
                    onChangeText={onChange}
                  />

                  <View style={styles.errorSpace}>
                    {!!errors.name && (
                      <Text style={styles.error}>{errors.name.message}</Text>
                    )}
                  </View>
                </>
              )}
            />

            {/* ADDRESS */}
            <Text style={styles.label}>Address*</Text>

            <Controller
              control={control}
              name="address"
              render={({ field: { value, onChange } }) => (
                <>
                  <AppInput
                    placeholder="Address Line 1"
                    value={value}
                    onChangeText={onChange}
                  />

                  <View style={styles.errorSpace}>
                    {!!errors.address && (
                      <Text style={styles.error}>{errors.address.message}</Text>
                    )}
                  </View>
                </>
              )}
            />

            {/* OPTIONAL ADDRESS */}
            <AppInput
              placeholder="Address Line 2 (Optional)"
              editable={false}
              style={styles.optionalInput}
            />

            <View style={{ height: 18 }} />

            {/* PINCODE */}
            <Text style={styles.label}>Pin Code*</Text>

            <Controller
              control={control}
              name="pincode"
              render={({ field: { value, onChange } }) => (
                <>
                  <AppInput
                    placeholder="110017"
                    value={value}
                    keyboardType="number-pad"
                    onChangeText={onChange}
                  />

                  <View style={styles.errorSpace}>
                    {!!errors.pincode && (
                      <Text style={styles.error}>{errors.pincode.message}</Text>
                    )}
                  </View>
                </>
              )}
            />
          </ScrollView>

          <View style={styles.bottomContainer}>
            <TouchableOpacity
              style={[styles.button, !isFilled && styles.disabledButton]}
              onPress={handleSubmit(onSubmit)}
            >
              <Text
                style={[
                  styles.buttonText,
                  !isFilled && styles.disabledButtonText,
                ]}
              >
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232426",
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 14,
    marginBottom: 24,
  },

  formContainer: {
    paddingHorizontal: 16,
  },

  label: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 8,
  },

  errorSpace: {
    minHeight: 20,
    justifyContent: "center",
  },

  error: {
    color: "#FF4D4F",
    fontSize: 11,
  },

  optionalInput: {
    opacity: 0.65,
  },

  bottomContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    marginTop: "auto",
  },

  button: {
    height: 44,
    backgroundColor: "#2D9CFF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  disabledButton: {
    backgroundColor: "#2F3134",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },

  disabledButtonText: {
    color: "#666666",
  },
});
