import React from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";
import { getTokens } from "../api/notification";

navigator.serviceWorker
  .register("firebase-messaging-sw.js")
  .then(function (registration) {
    console.log("Service worker successfully registered.");
    return registration;
  })
  .catch(function (err) {
    console.error("Unable to register service worker.", err);
  });

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FCM_API_KEY,
  authDomain: import.meta.env.VITE_FCM_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FCM_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FCM_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FCM_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FCM_APP_ID,
  measurementId: import.meta.env.VITE_FCM_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
const analytics = getAnalytics(app);

// 허가 요청
export function requestPermission() {
  void Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      getToken(messaging, { vapidKey: import.meta.env.VITE_APP_FCM_VAPID_KEY })
        .then((token: string) => {
          console.log(`푸시 토큰 발급 완료 : ${token}`);
        })
        .catch(() => {
          console.log("푸시 토큰 가져오는 중에 에러 발생");
        });
    } else if (permission === "denied") {
      console.log("푸시 권한 차단");
    }
  });
}
