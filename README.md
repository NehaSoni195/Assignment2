# StapuBox OTP App

This is a React Native app for mobile number login using OTP verification. It was built as part of the StapuBox assignment.

## Features

- Enter mobile number and send OTP
- Verify OTP using 4-digit code
- Auto-submit OTP when completed
- Resend OTP with 60 seconds timer
- SMS auto-read support (Android)
- Basic validation and error handling

## Tech Stack

- React Native
- Expo
- Axios
- React Hook Form
- Zod

## Setup

```bash
npm install
```

## Run App

```bash
npx expo start
```

## Environment Variables

Create a `.env` file:

```
BASE_URL=https://stapubox.com/trial
API_TOKEN=trial_61157518_b9fd43473ad65bfeed98f97898f104e3
```

## API Used

- Send OTP
- Verify OTP
- Resend OTP

## Notes

- SMS auto-read works only on Android
- Internet is required for API calls

## Author

Neha Soni
