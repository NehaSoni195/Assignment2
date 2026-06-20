import { api } from "./axios";

export const sendOtpApi = (mobile: string) => {
  return api.post("/sendOtp", {
    mobile,
  });
};

export const resendOtpApi = (mobile: string) => {
  return api.post(`/resendOtp?mobile=${mobile}`);
};

export const verifyOtpApi = async (mobile: string, otp: string) => {
  const response = await api.post(`/verifyOtp?mobile=${mobile}&otp=${otp}`);

  console.log("VERIFY RESPONSE:", response.data);

  return response.data;
};
