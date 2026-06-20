import { useMutation } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

import { resendOtpApi, verifyOtpApi } from "../api/authApi";
import OTPInput from "../components/OTPInput";
import useCountdown from "../hooks/useCountdown";

export default function Otp() {
  const { mobile } = useLocalSearchParams();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState(false);

  const { seconds, reset } = useCountdown();

  const verifyMutation = useMutation({
    mutationFn: ({ mobile, otp }: { mobile: string; otp: string }) =>
      verifyOtpApi(mobile, otp),

    onSuccess: (data: any) => {
      if (data?.status === "success" && data?.data?.[0]?.verified === true) {
        setError(false);

        Toast.show({
          type: "success",
          text1: "OTP verified successfully",
        });

        router.replace("/details");
      } else {
        setError(true);
        setOtp("");

        Toast.show({
          type: "error",
          text1: "Invalid OTP",
        });
      }
    },

    onError: () => {
      setError(true);
      setOtp("");

      Toast.show({
        type: "error",
        text1: "Invalid OTP",
      });
    },
  });

  const resendMutation = useMutation({
    mutationFn: resendOtpApi,

    onSuccess: () => {
      reset();

      Toast.show({
        type: "success",
        text1: "OTP resent successfully",
      });
    },

    onError: () => {
      Toast.show({
        type: "error",
        text1: "Failed to resend OTP",
      });
    },
  });

  useEffect(() => {
    if (otp.length === 4 && !verifyMutation.isPending) {
      verifyMutation.mutate({
        mobile: String(mobile),
        otp,
      });
    }
  }, [otp]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Phone Verification</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>
          Enter 4 digit OTP sent to your phone number
        </Text>

        <OTPInput
          value={otp}
          setValue={(value) => {
            setError(false);
            setOtp(value);
          }}
          error={error}
        />

        {verifyMutation.isPending && (
          <ActivityIndicator
            size="small"
            color="#2196F3"
            style={{ marginTop: 25 }}
          />
        )}

        <View style={styles.resendContainer}>
          {seconds === 0 ? (
            <TouchableOpacity
              disabled={resendMutation.isPending}
              onPress={() => resendMutation.mutate(String(mobile))}
            >
              <Text style={styles.resend}>
                {resendMutation.isPending ? "Sending..." : "Resend OTP"}
              </Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.timer}>Resend OTP in {seconds}s</Text>
          )}
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

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 10,
    marginTop: 20,
  },

  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#2B2B2B",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 26,
  },

  backArrow: {
    color: "#FFFFFF",
    fontSize: 26,
    marginTop: -2,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "500",
    marginLeft: 12,
  },

  content: {
    paddingHorizontal: 20,
    marginTop: 40,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "500",
    lineHeight: 34,
    marginBottom: 28,
  },

  resendContainer: {
    marginTop: 14,
  },

  resend: {
    color: "#2196F3",
    fontSize: 12,
    fontWeight: "500",
  },

  timer: {
    color: "#8E8E8E",
    fontSize: 12,
  },
});
