import axios from "axios";

export const api = axios.create({
  baseURL: "https://stapubox.com/trial",
  headers: {
    "Content-Type": "application/json",
    "X-Api-Token": "trial_61157518_b9fd43473ad65bfeed98f97898f104e3",
  },
});
