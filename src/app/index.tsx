import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { Controller, useForm, useWatch } from "react-hook-form";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";

import { ZodObject, ZodString, ZodTypeAny } from "zod";
import { sendOtpApi } from "../../src/api/authApi";
import AppButton from "../../src/components/AppButton";
import AppInput from "../../src/components/AppInput";
import { mobileSchema } from "../../src/utils/validators";

export default function Index() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(mobileSchema),
    defaultValues: {
      mobile: "",
    },
  });

  const mobile = useWatch({
    control,
    name: "mobile",
  });

  const mutation = useMutation({
    mutationFn: sendOtpApi,

    onSuccess: (_, mobile) => {
      Toast.show({
        type: "success",
        text1: "OTP Sent",
      });

      router.push({
        pathname: "/otp",
        params: {
          mobile,
        },
      });
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Login to Your Account</Text>

        <View style={styles.phoneRow}>
          <View style={styles.countryCodeBox}>
            <Text style={styles.countryCode}>+91</Text>
          </View>

          <View style={styles.inputContainer}>
            <Controller
              control={control}
              name="mobile"
              render={({ field: { value, onChange } }) => (
                <AppInput
                  value={value}
                  onChangeText={onChange}
                  keyboardType="number-pad"
                  placeholder="9999999999"
                />
              )}
            />

            {/* Fixed height prevents UI jumping */}
            <View style={styles.errorContainer}>
              {!!errors.mobile?.message && (
                <Text style={styles.errorText}>{errors.mobile.message}</Text>
              )}
            </View>
          </View>
        </View>

        <AppButton
          title="Send OTP"
          loading={mutation.isPending}
          disabled={!mobile?.trim()}
          onPress={handleSubmit((data) => mutation.mutate(data.mobile))}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>

          <Text style={styles.createAccount}> Create Account</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B1B1D",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 28,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 28,
  },

  phoneRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  countryCodeBox: {
    width: 58,
    height: 48,
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },

  countryCode: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },

  inputContainer: {
    flex: 1,
  },

  errorContainer: {
    minHeight: 20,
    marginTop: 4,
  },

  errorText: {
    color: "#ff5c5c",
    fontSize: 12,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },

  footerText: {
    color: "#A0A0A0",
    fontSize: 11,
  },

  createAccount: {
    color: "#2196F3",
    fontSize: 11,
  },

  profileSwitcher: {
    width: 58,
    height: 32,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    alignSelf: "center",
    marginTop: 70,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 2,
  },

  greenAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#2DBE60",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarLetter: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  grayAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#D0D0D0",
    marginLeft: 2,
  },
});

function zodResolver(
  mobileSchema: ZodObject<
    { mobile: ZodString },
    "strip",
    ZodTypeAny,
    { mobile: string },
    { mobile: string }
  >,
): import("react-hook-form").Resolver<
  { mobile: string },
  any,
  { mobile: string }
> {
  return async (values) => {
    const result = mobileSchema.safeParse(values);

    if (result.success) {
      return {
        values: result.data,
        errors: {},
      };
    }

    const fieldErrors = result.error.formErrors.fieldErrors;

    const errors = Object.entries(fieldErrors).reduce(
      (acc, [key, messages]) => {
        if (messages && messages.length > 0) {
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
}
