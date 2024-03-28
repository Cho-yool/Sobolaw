import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";

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
// const analytics = getAnalytics(app);

// const response = null;
// onMessage(messaging, (payload) => {
//   console.log("Message received. ", payload);
//   response.value = payload.notification;
//   if (Notification.permission === "granted") {
//     navigator.serviceWorker.ready
//       .then((registration) => {
//         registration
//           .showNotification(payload.notification.title, {
//             body: payload.notification.body,
//             icon: "../img/maru.jpeg",
//             vibrate: [200, 100, 200, 100, 200, 100, 200],
//           })
//           .finally((arg) => console.log(arg));
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
// });

// 허가 요청
export function requestPermission() {
  return new Promise((resolve, reject) => {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        getToken(messaging, {
          vapidKey: import.meta.env.VITE_APP_FCM_VAPID_KEY,
        })
          .then((token: string) => {
            console.log(`푸시 토큰 발급 완료 : ${token}`);
            resolve(token); // 토큰을 resolve하여 Promise 완료
          })
          .catch((err) => {
            console.error("푸시 토큰 가져오는 중에 에러 발생:", err);
            reject(err); // 에러 발생시 reject하여 Promise 완료
          });
      } else if (permission === "denied") {
        console.log("푸시 권한 차단");
        reject(new Error("푸시 알림이 거부되었습니다.")); // 거부 시에도 reject하여 Promise 완료
      } else {
        console.log("푸시 허용을 기다리는 중...");
        reject(new Error("푸시 허용 대기 중입니다.")); // 다른 상황도 reject하여 Promise 완료
      }
    });
  });
}
